


  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  -------------------------------            START          -----------------------------------------


 
  Agent SwiftLoan is an intelligent, autonomous loan application system built for the Agentic AI Unleashed: AWS & NVIDIA Hackathon.

This project re-imagines the traditional, slow, and manual loan application process. Agent SwiftLoan uses a multi-agent AI crew (powered by NVIDIA NIMs and CrewAI) to automate the entire loan workflow—from data intake to final approval—providing a seamless, fast, and professional user experience.

🚀 Demo Video
(Insert your 3-minute YouTube demo link here. This is the most important part!)

[YOUTUBE_DEMO_LINK_HERE]

✨ Key Features
Conversational AI Intake: A user-friendly React chat interface that guides the user through the application, collecting all necessary information (name, income, credit score, etc.).

Real-time Progress Tracker: A professional dashboard that visually tracks the application's status live, moving from "Application" to "Verification," "Underwriting," and "Approved".

Dynamic AI Agent Panel: A live sidebar that shows which AI agent is currently "Working" or "Done," giving the user transparency into the autonomous process.

Autonomous 4-Agent Backend: A robust backend built with CrewAI and NVIDIA NIMs, featuring four distinct AI experts:

Sales Agent: Extracts structured JSON data from the user's free-form chat.

Verification Agent: Validates the extracted data against business rules (e.g., checks if the PAN is ABCDE1234F and the credit score is above 650).

Underwriting Agent: Analyzes the verified financial data (like income and credit score) to determine the loan risk (Low, Medium, High).

Sanction Agent: Gathers all reports and writes a final, professional, and personalized approval or rejection letter to the customer, signed by the "Agent SwiftLoan AI Team."

💻 Tech Stack
Backend: Python, FastAPI, CrewAI

AI Model: NVIDIA NIMs (powered by meta/llama-3-1-8b-instruct or other selected model)

LangChain: langchain_nvidia_ai_endpoints is used to connect to the NVIDIA NIMs.

Frontend: React, Vite, TypeScript, Tailwind CSS, shadcn/ui

Deployment: The backend AI Agents are designed for deployment on AWS EKS or Amazon SageMaker as per hackathon requirements.

🛠️ How to Run This Project
This project requires 2 Terminals running simultaneously (one for the backend, one for the frontend).

Prerequisites

Python 3.10+

Node.js 18+

An NVIDIA API Key

1. Backend Setup (Terminal 1)

Clone this repository:

Bash
git clone https://github.com/neeraj098-source/SwiftLoan-Ai.git
cd [SwiftLoan-Ai.git]
Create and activate a Python virtual environment:

Bash
python3 -m venv venv
source venv/bin/activate
Install all Python dependencies:

Bash
pip install -r requirements.txt
Create a .env file for your API keys:

Bash
echo "NVIDIA_API_KEY=nvapi-YOUR_API_KEY_HERE" > .env
echo "NVIDIA_MODEL=meta/llama-3-1-8b-instruct" >> .env
echo "PORT=8000" >> .env
(Note: The main.py file is configured to use PORT 8000 from this file).

Run the backend server:

Bash
python main.py
(The server will start on http://localhost:8000)

2. Frontend Setup (Terminal 2)

Open a new terminal tab and navigate to the project folder:

Bash
cd [SwiftLoan-Ai.git]
Install all Node.js dependencies:

Bash
npm install
Run the frontend development server:

Bash
npm run dev
Open your browser and go to http://localhost:3000 to use the application!
  
  
