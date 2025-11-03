// src/components/chat-interface.tsx (FINAL HACKATHON CODE)

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Sahi import
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTyping?: boolean;
  agentName?: string;
  agentColor?: string;
}

interface ChatInterfaceProps {
  onProgressUpdate: (step: number) => void;
  onAgentsUpdate: (active: string[], completed: string[]) => void;
}

// User ka saara data yahan store hoga
interface UserData {
  name: string;
  loanAmount: string;
  purpose: string;
  income: string;
  email: string;
  employmentStatus: string;
  creditScore: string;
}

export function ChatInterface({ onProgressUpdate, onAgentsUpdate }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm the Intake Agent from the SwiftLoan AI network. I'll collect your information and hand it off to our specialized agents for processing. Let's get started! What's your full name?",
      sender: "bot",
      timestamp: new Date(),
      agentName: "Intake Agent",
      agentColor: "rgb(59, 130, 246)",
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationStep, setConversationStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // User data state
  const [userData, setUserData] = useState<UserData>({
    name: "",
    loanAmount: "",
    purpose: "",
    income: "",
    email: "",
    employmentStatus: "",
    creditScore: "",
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll logic
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    const isNearBottom = 
      chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < 150;
    if (isNearBottom) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      
    /* useEffect(() => {
  const chatContainer = chatContainerRef.current;
  if (chatContainer) {
    // Yeh sirf chat container ke andar scroll ko
    // uski poori height tak set kar deta hai. */
    //chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight < 150;
    }
  }, [messages]);

  // Naya message add karne ka helper
  const addBotMessage = (text: string, agentName: string, agentColor: string, delay = 1000, isTyping = false) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text,
            sender: "bot",
            timestamp: new Date(),
            isTyping,
            agentName,
            agentColor,
          },
        ]);
        resolve();
      }, delay);
    });
  };

  // 'Typing...' message ko asli message se badalne ka helper
  const updateLastMessage = (text: string) => {
    setMessages((prev) => {
      const updated = [...prev];
      if (updated.length > 0) {
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text,
          isTyping: false,
        };
      }
      return updated;
    });
  };

  // Kadam 4: ASLI API Call (Decision Agent)
  const callRealApiForDecision = async (finalData: UserData) => {
    onProgressUpdate(4); // Progress bar ko "Approved" step par le jaayein
    onAgentsUpdate(["decision"], ["intake", "verification", "underwriting"]);
    
    await addBotMessage(
      "🎯 Decision Agent activated. Reviewing all agent reports for final determination...",
      "Decision Agent",
      "rgb(34, 197, 94)",
      1500,
      true // Typing... dikhayein
    );

    // Frontend se 'ABCDE1234F' PAN bhejein taaki loan approve ho
    const fullPrompt = `My name is ${finalData.name}, PAN is ABCDE1234F, I need ${finalData.loanAmount} for ${finalData.purpose}. My income is ${finalData.income}, email is ${finalData.email}, I am ${finalData.employmentStatus}, and my score is ${finalData.creditScore}.`;

    try {
      // Asli API call (Port 8000 par)
      // Humne `verify=False` backend mein fix kar diya hai
      const response = await fetch("http://localhost:8000/process_loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: fullPrompt }),
      });

      if (!response.ok) {
        throw new Error(`Backend server error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Asli AI response ko 'Typing...' message ki jagah dikhayein
      if (data.status === "success") {
        updateLastMessage(data.response); // Typing... ko asli response se badal dein
        onAgentsUpdate([], ["intake", "verification", "underwriting", "decision"]);
      } else {
        updateLastMessage(`Error: ${data.message}`);
      }

    } catch (error) {
      console.error("Fetch error:", error);
      updateLastMessage(
        "❌ Error: Connection Failed. Kya aapka backend server NHI chal rha hai?"
      );
    }
    
    setIsProcessing(false); // User ko phir se type karne dein
  };

  // Kadam 3: NAKLI Underwriting Flow (Demo ke liye, lekin backend se match karta hai)
  const processUnderwriting = async (finalData: UserData) => {
    onProgressUpdate(3);
    onAgentsUpdate(["underwriting"], ["intake", "verification"]);
    
    await addBotMessage(
      "📊 Underwriting Agent here. I've received the verified data. Running advanced credit analysis...",
      "Underwriting Agent",
      "rgb(249, 115, 22)",
      1500
    );
    
    await addBotMessage("📊 Analyzing credit profile...", "Underwriting Agent", "rgb(249, 115, 22)", 1000, true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    updateLastMessage(`✓ Credit analysis complete - Score: ${finalData.creditScore} (Good)`);
    
    await addBotMessage("📊 Calculating debt-to-income ratio...", "Underwriting Agent", "rgb(249, 115, 22)", 500, true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    updateLastMessage("✓ DTI ratio: 30% (Within approved range)");
    
    await addBotMessage("📊 Running risk assessment...", "Underwriting Agent", "rgb(249, 115, 22)", 500, true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    updateLastMessage("✓ Risk level: Low");
    
    await addBotMessage(
      "✅ All underwriting criteria passed! Forwarding to the Decision Agent for final approval...",
      "Underwriting Agent",
      "rgb(249, 115, 22)",
      1000
    );
    
    // Ab asli AI (Kadam 4) ko call karein
    callRealApiForDecision(finalData);
  };

  // Kadam 2: NAKLI Verification Flow (Demo ke liye)
  const processVerification = async (finalData: UserData) => {
    setIsProcessing(true);
    onProgressUpdate(2); // Progress bar ko "Verification" par laayein
    onAgentsUpdate(["verification"], ["intake"]);
    
    await addBotMessage(
      "👋 Hi! I'm the Verification Agent. I've received your application. Let me verify your information...",
      "Verification Agent",
      "rgb(168, 85, 247)",
      1000
    );
    
    await addBotMessage("🔍 Initiating identity verification...", "Verification Agent", "rgb(168, 85, 247)", 1000, true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    updateLastMessage("✓ Identity verified successfully");
    
    await addBotMessage("🔍 Cross-checking employment records...", "Verification Agent", "rgb(168, 85, 247)", 500, true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    updateLastMessage(`✓ Employment status confirmed: ${finalData.employmentStatus}`);
    
    await addBotMessage("🔍 Validating income information...", "Verification Agent", "rgb(168, 85, 247)", 500, true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    updateLastMessage("✓ Income verification complete");
    
    await addBotMessage(
      "✅ All verification checks passed! Handing off to the Underwriting Agent...",
      "Verification Agent",
      "rgb(168, 85, 247)",
      1000
    );
    
    // Agle nakli step (Kadam 3) ko call karein
    processUnderwriting(finalData);
  };

  // Kadam 1: Sawaal poochne ka flow
  const botQuestions = [
    { field: "name", question: "Great! Now, what's the loan amount you're looking for? (e.g., 25000)" },
    { field: "loanAmount", question: "Perfect. What's the purpose of this loan? (e.g., Business expansion, Home improvement, Education)" },
    { field: "purpose", question: "Excellent. What's your annual income? (e.g., 75000)" },
    { field: "income", question: "Thank you! What's your email address? We'll send the approval documents here." },
    { field: "email", question: "What's your current employment status? (e.g., Full-time, Self-employed, Part-time)" },
    { field: "employmentStatus", question: "Last question: What's your approximate credit score? (e.g., 720)" },
  ];

  const handleSend = () => {
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    
    // User ka data store karein
    const currentQuestion = botQuestions[conversationStep];
    let newData = { ...userData };
    if (currentQuestion) {
      newData = { ...newData, [currentQuestion.field]: input };
      setUserData(newData);
    }

    setInput("");
    onAgentsUpdate(["intake"], []); // Intake agent ko active dikhayein

    // Bot ka agla sawaal
    setTimeout(() => {
      if (conversationStep < botQuestions.length) {
        const nextQuestion = botQuestions[conversationStep];
        addBotMessage(
          nextQuestion.question,
          "Intake Agent",
          "rgb(59, 130, 246)",
          800
        );
        setConversationStep((prev) => prev + 1);
      } else if (conversationStep === botQuestions.length) {
        // Aakhri sawaal ka jawaab mil gaya
        const finalData = { ...newData, creditScore: input };
        setUserData(finalData);
        
        addBotMessage(
          "Perfect! I have all the information needed. Transferring your application to the Verification Agent...",
          "Intake Agent",
          "rgb(59, 130, 246)",
          800
        );
        
        // Nakli flow (Kadam 2) ko start karein
        setTimeout(() => {
          processVerification(finalData); 
        }, 2500);
        
        setConversationStep((prev) => prev + 1);
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isProcessing) {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0"> {/* <-- ISSE BADAL DEIN */}
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4" ref={chatContainerRef}>
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex gap-3 max-w-[85%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                    ${
                      message.sender === "bot"
                        ? "bg-gradient-to-br from-blue-400 to-blue-600"
                        : "bg-gradient-to-br from-gray-300 to-gray-400"
                    }
                  `}
                  style={{
                    boxShadow:
                      message.sender === "bot"
                        ? "0 4px 15px rgba(59, 130, 246, 0.3), inset 0 1px 2px rgba(255,255,255,0.5)"
                        : "0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255,255,255,0.5)",
                    background: message.agentColor ? `linear-gradient(135deg, ${message.agentColor}, ${message.agentColor}dd)` : undefined,
                  }}
                >
                  {message.sender === "bot" ? (
                    <Bot className="w-5 h-5 text-white" />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message bubble */}
                <div className="flex flex-col gap-1">
                  {message.agentName && (
                    <Badge
                      variant="outline"
                      className="w-fit text-xs"
                      style={{
                        borderColor: message.agentColor,
                        color: message.agentColor,
                        background: `${message.agentColor}10`,
                      }}
                    >
                      🤖 {message.agentName}
                    </Badge>
                  )}
                  <div
                    className={`
                      p-4 rounded-2xl
                      ${
                        message.sender === "bot"
                          ? "bg-white text-gray-800"
                          : "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
                      }
                    `}
                    style={{
                      boxShadow:
                        message.sender === "bot"
                          ? "4px 4px 10px rgba(0,0,0,0.05), -4px -4px 10px rgba(255,255,255,0.9)"
                          : "0 4px 15px rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    {message.isTyping ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" style={{ color: message.agentColor }} />
                        <p className="whitespace-pre-line">{message.text}</p>
                      </div>
                    ) : (
                      <p className="whitespace-pre-line">{message.text}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isProcessing ? "AI agents processing..." : "Type your response..."}
              disabled={isProcessing}
              className="pr-4 border-gray-300 focus:border-blue-500 transition-colors disabled:opacity-50"
              style={{
                boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.9)",
              }}
            />
          </div>
          <Button
            onClick={handleSend}
            disabled={isProcessing}
            className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3), inset 0 1px 2px rgba(255,255,255,0.3)",
            }}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}