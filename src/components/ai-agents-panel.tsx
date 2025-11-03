import { Bot, Shield, TrendingUp, CheckCircle, Sparkles, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

interface Agent {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  status: "idle" | "active" | "completed";
  color: string;
}

interface AIAgentsPanelProps {
  activeAgents: string[];
  completedAgents: string[];
}

const agents: Agent[] = [
  {
    id: "intake",
    name: "Intake Agent",
    role: "Collects application data",
    icon: Bot,
    status: "idle",
    color: "rgb(59, 130, 246)",
  },
  {
    id: "verification",
    name: "Verification Agent",
    role: "Validates identity & documents",
    icon: Shield,
    status: "idle",
    color: "rgb(168, 85, 247)",
  },
  {
    id: "underwriting",
    name: "Underwriting Agent",
    role: "Analyzes creditworthiness",
    icon: TrendingUp,
    status: "idle",
    color: "rgb(249, 115, 22)",
  },
  {
    id: "decision",
    name: "Decision Agent",
    role: "Final approval authority",
    icon: CheckCircle,
    status: "idle",
    color: "rgb(34, 197, 94)",
  },
];

export function AIAgentsPanel({ activeAgents, completedAgents }: AIAgentsPanelProps) {
  const getAgentStatus = (agentId: string): "idle" | "active" | "completed" => {
    if (completedAgents.includes(agentId)) return "completed";
    if (activeAgents.includes(agentId)) return "active";
    return "idle";
  };

  return (
    <div
      className="bg-white rounded-2xl p-6"
      style={{
        boxShadow: "8px 8px 20px rgba(0,0,0,0.05), -8px -8px 20px rgba(255,255,255,0.9)",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center"
          style={{
            boxShadow: "0 4px 15px rgba(168, 85, 247, 0.3), inset 0 1px 2px rgba(255,255,255,0.5)",
          }}
        >
          <Brain className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-gray-900">AI Agent Network</h3>
          <p className="text-sm text-gray-500">Autonomous processing system</p>
        </div>
      </div>

      <div className="space-y-3">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          const status = getAgentStatus(agent.id);

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                relative rounded-xl p-4 transition-all duration-500
                ${status === "active" 
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 shadow-lg" 
                  : "bg-gray-50 border border-transparent"
                }
              `}
              style={{
                boxShadow: status === "active" 
                  ? "0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)" 
                  : "none",
              }}
            >
              <div className="flex items-start gap-4">
                {/* Agent Icon */}
                <div className="relative">
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500
                      ${status === "completed" 
                        ? "bg-gradient-to-br from-green-400 to-green-600" 
                        : status === "active" 
                        ? "bg-gradient-to-br from-blue-500 to-blue-600" 
                        : "bg-gray-200"
                      }
                    `}
                    style={{
                      boxShadow: status === "completed"
                        ? "0 4px 20px rgba(34, 197, 94, 0.4), inset 0 1px 2px rgba(255,255,255,0.5)"
                        : status === "active"
                        ? "0 4px 20px rgba(59, 130, 246, 0.5), inset 0 1px 2px rgba(255,255,255,0.5)"
                        : "inset 2px 2px 5px rgba(0,0,0,0.1)",
                    }}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        status !== "idle" ? "text-white" : "text-gray-400"
                      }`}
                    />
                  </div>

                  {/* Active pulse animation */}
                  {status === "active" && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-blue-400"
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-blue-300"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.3,
                        }}
                      />
                    </>
                  )}

                  {/* Completed checkmark */}
                  {status === "completed" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white"
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Agent Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className={`${status !== "idle" ? "text-gray-900" : "text-gray-500"}`}>
                      {agent.name}
                    </p>
                    {status === "active" && (
                      <Badge
                        variant="outline"
                        className="bg-blue-100 text-blue-700 border-blue-300 text-xs"
                      >
                        Working
                      </Badge>
                    )}
                    {status === "completed" && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 text-xs"
                      >
                        Done
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{agent.role}</p>

                  {/* Active progress bar */}
                  {status === "active" && (
                    <div className="mt-3 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Agent Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-900">
              {completedAgents.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Completed</p>
          </div>
          <div>
            <p className="text-gray-900">
              {activeAgents.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Active</p>
          </div>
          <div>
            <p className="text-gray-900">
              {agents.length - completedAgents.length - activeAgents.length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Queued</p>
          </div>
        </div>
      </div>
    </div>
  );
}