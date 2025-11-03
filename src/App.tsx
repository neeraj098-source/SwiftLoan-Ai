import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ProgressTracker } from "./components/progress-tracker";
import { ChatInterface } from "./components/chat-interface";
import { LoanStats } from "./components/loan-stats";
import { LoanChart } from "./components/loan-chart";
import { AIAgentsPanel } from "./components/ai-agents-panel";

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [completedAgents, setCompletedAgents] = useState<string[]>([]);

  const handleAgentsUpdate = (active: string[], completed: string[]) => {
    setActiveAgents(active);
    setCompletedAgents(completed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center"
                style={{
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3), inset 0 1px 2px rgba(255,255,255,0.5)",
                }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">SwiftLoan AI </h1>
                <p className="text-sm text-gray-500">Powered by Autonomous AI Agent Network</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-700">AI Agents Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Progress Tracker */}
        <div
          className="bg-white rounded-2xl p-8 mb-8 max-w-6xl mx-auto"
          style={{
            boxShadow: "8px 8px 20px rgba(0,0,0,0.05), -8px -8px 20px rgba(255,255,255,0.9)",
          }}
        >
          <h2 className="text-gray-900 mb-6">Application Progress</h2>
          <ProgressTracker currentStep={currentStep} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Chat Interface */}
          <div
            className="lg:col-span-2 bg-white rounded-2xl overflow-hidden flex flex-col "
            style={{
              boxShadow: "8px 8px 20px rgba(0,0,0,0.05), -8px -8px 20px rgba(255,255,255,0.9)",
              height: "650px",
            }}
          >
            <div className="border-b border-gray-200 px-6 py-4 bg-gradient-to-r from-blue-50 to-purple-50">
              <h2 className="text-gray-900">AI Agent Communication</h2>
              <p className="text-sm text-gray-500 mt-1">Autonomous agents processing your application</p>
            </div>
            <ChatInterface onProgressUpdate={setCurrentStep} onAgentsUpdate={handleAgentsUpdate} />
          </div>

          {/* Right Sidebar - Agents Panel and Chart */}
          <div className="lg:col-span-1 space-y-8">
            {/* AI Agents Panel */}
            <AIAgentsPanel activeAgents={activeAgents} completedAgents={completedAgents} />

            {/* Loan Chart */}
            <LoanChart />
          </div>
        </div>

        {/* Statistics */}
        <LoanStats />
      </main>
    </div>
  );
}