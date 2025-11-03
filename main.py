# main.py - FIXED VERSION

import os 
from dotenv import load_dotenv
load_dotenv()
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests

# Fixed imports
from crewai import Agent, Task, Crew, Process
from langchain_nvidia_ai_endpoints import ChatNVIDIA

# --- Global Variables ---
llm = None
agents_list = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    initialize_ai_engine()
    yield
    # Shutdown
    pass

# --- API Setup ---
app = FastAPI(
    title="SwiftLoan AI API",
    lifespan=lifespan
)

# --- NVIDIA Configuration ---
NVIDIA_API_KEY = "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"
os.environ["NVIDIA_API_KEY"] = NVIDIA_API_KEY
os.environ["NVIDIA_NIM_API_KEY"] = NVIDIA_API_KEY

# --- CORS Configuration ---
origins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001"
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"],
)

def test_nvidia_connection():
    """Test if we can connect to NVIDIA API"""
    try:
        headers = {
            "Authorization": f"Bearer {NVIDIA_API_KEY}",
            "Content-Type": "application/json"
        }
        response = requests.get(
            "https://integrate.api.nvidia.com/v1/models",
            headers=headers,
            timeout=10,
            verify=False
            
        )
        if response.status_code == 200:
            print("✅ NVIDIA API connection successful")
            models = response.json()
            available_models = [model['id'] for model in models.get('data', [])]
            print(f"📋 Available models: {available_models}")
            return True, available_models
        else:
            print(f"❌ NVIDIA API connection failed: {response.status_code} - {response.text}")
            return False, []
    except Exception as e:
        print(f"❌ NVIDIA API connection error: {e}")
        return False, []

def initialize_ai_engine():
    """Initialize LLM and Agents"""
    global llm, agents_list
    
    if llm is not None:
        print("🔄 Engine already initialized")
        return
    
    print("🚀 Starting AI Engine Initialization...")
    
    # Test connection first
    connection_ok, available_models = test_nvidia_connection()
    if not connection_ok:
        print("❌ Cannot initialize without NVIDIA API connection")
        return
    
    # Try different models
    model_choices = [
        "meta/llama-3-1-8b-instruct",
        "meta/llama-3-1-70b-instruct", 
        "mistralai/mistral-7b-instruct-v0.3",
        "mistralai/mixtral-8x7b-instruct-v0.1",
        "nvidia/llama-3-1-8b-instruct"
    ]
    
    # Find which model is available
    working_model = None
    for model in model_choices:
        if model in available_models:
            working_model = model
            break
    
    if not working_model and available_models:
        working_model = available_models[0]  # Use first available model
    
    if not working_model:
        print("❌ No compatible models found")
        return
        
    print(f"🤖 Using model: {working_model}")
    
    try:
        # Initialize LLM with explicit configuration
        llm = ChatNVIDIA(
            model=working_model,
            temperature=0.1,  # Lower temperature for more consistent responses
            max_tokens=1024,
            top_p=0.7,
            nvidia_api_key=NVIDIA_API_KEY
        )
        
        # Test the LLM with a simple message
        test_response = llm.invoke("Say 'Hello World' in one word.")
        print(f"✅ LLM Test successful: {test_response}")
        
    except Exception as e:
        print(f"❌ LLM Initialization failed: {e}")
        llm = None
        return
    
    # Initialize Agents
    try:
        sales_agent = Agent(
            role='Sales Data Extractor',
            goal='Extract name, PAN, and loan amount from customer message. Output clean JSON.',
            backstory='Expert at extracting structured data from informal messages.',
            llm=llm,
            allow_delegation=False,
            verbose=True,
        )
        
        verification_agent = Agent(
            role='Verification Agent',
            goal='Verify PAN and credit score. Approve if PAN=ABCDE1234F (score=780), else reject.',
            backstory='Handles KYC and credit verification simulations.',
            llm=llm,
            allow_delegation=False,
            verbose=True,
        )
        
        # --- YEH NAYA AGENT ADD KAREIN ---
        underwriting_agent = Agent(
            role='Underwriting Agent',
            goal='Analyze credit score and income to determine loan risk. (e.g., score > 700 is Low Risk).',
            backstory='Expert at financial risk assessment using provided data.',
            llm=llm,
            allow_delegation=False,
            verbose=True,
        )
        
        sanction_agent = Agent(
            role='Sanction Agent', 
            goal='Generate final approval/rejection message for customer.',
            backstory='Creates professional customer communications.',
            llm=llm,
            allow_delegation=False,
            verbose=True,
        )
        
        agents_list = [sales_agent, verification_agent, underwriting_agent, sanction_agent] # <-- YEH NAYI LINE HAI
        print("✅ All agents initialized successfully")
        
    except Exception as e:
        print(f"❌ Agent initialization failed: {e}")
        agents_list = None

# --- Request Models ---
class LoanRequest(BaseModel):
    message: str

# --- API Endpoints ---
@app.post("/process_loan")
async def process_loan_request(request: LoanRequest):
    print(f"📥 Received request: {request.message}")
    
    if not agents_list or not llm:
        error_msg = "AI Engine not ready. Please check server logs."
        print(f"❌ {error_msg}")
        return {"status": "error", "message": error_msg}
    
    try:
        # Create tasks
        task_sales = Task(
    description=f"Extract all key information from this customer message: '{request.message}'. Get: Full Name, PAN Number, Loan Amount, Purpose, Income, Email, Employment Status, and Credit Score.",
    expected_output='{"name": "Neeraj", "pan": "ABCDE1234F", "amount": 40000, "purpose": "home", "income": 600000, "email": "ny97325@gmail.com", "employmentStatus": "full employment", "creditScore": 657}',
    agent=agents_list[0] # sales_agent
)

        task_verify = Task(
    description="Verify the data from the previous step. The PAN must be 'ABCDE1234F'. The Credit Score must be 650 or higher. Based on these TWO rules, output a JSON with 'decision' (Approved/Rejected) and 'reason'.",
    expected_output='{"decision": "Approved", "reason": "PAN matched and credit score is above 650."}',
    agent=agents_list[1], # verification_agent
    context=[task_sales]
)

        # --- YEH NAYA TASK ADD KAREIN ---
        task_underwrite = Task(
    description="Using the full extracted customer data (especially creditScore and income), determine a risk level (Low, Medium, High).",
    expected_output='{"risk_level": "Low", "analysis": "Credit score of 657 is good and income is sufficient."}',
    agent=agents_list[2], # underwriting_agent
    context=[task_sales, task_verify] # Isse saara context milega
)
        # ----------------------------------

        task_sanction = Task(
    description="Write a professional loan approval message for the customer. Use the customer's real name, loan amount, and credit score from the context. The message MUST be signed by 'Best Regards, Agent SwiftLoan AI Team'. DO NOT include any placeholders like [Your Name] or [Your Position].",
    expected_output="Dear Neeraj, ... Your loan for 40000 is approved... Your credit score of 657... Best Regards, Agent SwiftLoan AI Team",
    agent=agents_list[3], # sanction_agent
    context=[task_sales, task_verify, task_underwrite] # Isse saara data milega
)
        
        # Create and execute crew
        crew = Crew(
            agents=agents_list,
            # tasks=[task_sales, task_verify, task_sanction], # <-- YEH PURANI LINE HAI
            tasks=[task_sales, task_verify, task_underwrite, task_sanction], # <-- YEH NAYI LINE HAI
            process=Process.sequential,
            verbose=True,
        )
        
        print("🔄 Starting AI processing...")
        result = crew.kickoff()
        print(f"✅ Processing completed: {result}")
        
        return {
            "status": "success", 
            "response": str(result)
        }
        
    except Exception as e:
        error_msg = f"Processing error: {str(e)}"
        print(f"❌ {error_msg}")
        import traceback
        traceback.print_exc()
        return {"status": "error", "message": error_msg}

@app.get("/")
def read_root():
    status = "✅ Ready" if agents_list and llm else "❌ Not Ready"
    return {
        "message": "SwiftLoan AI API", 
        "status": status,
        "endpoints": {
            "health": "/health",
            "process_loan": "POST /process_loan"
        }
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy" if agents_list and llm else "unhealthy",
        "llm_ready": llm is not None,
        "agents_ready": agents_list is not None,
        "api_key_set": bool(NVIDIA_API_KEY)
    }

# --- Server Start ---
if __name__ == "__main__":
    print("🚀 Starting SwiftLoan AI Server...")
    print(f"🔑 API Key: {'✅ Set' if NVIDIA_API_KEY else '❌ Missing'}")
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0", 
        port=8000, 
        reload=False,
        log_level="info"
    )