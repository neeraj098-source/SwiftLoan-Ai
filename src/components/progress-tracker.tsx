import { CheckCircle2, FileText, Shield, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressTrackerProps {
  currentStep: number;
}

const steps = [
  { id: 1, name: "Application", icon: FileText },
  { id: 2, name: "Verification", icon: Shield },
  { id: 3, name: "Underwriting", icon: TrendingUp },
  { id: 4, name: "Approved", icon: Sparkles },
];

export function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-[30px] left-0 right-0 h-1 bg-gray-200 -z-10" 
             style={{ marginLeft: "30px", marginRight: "30px" }}>
          <motion.div
            className={`h-full ${
              currentStep === 4 
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-blue-500 to-blue-600"
            }`}
            initial={{ width: "0%" }}
            animate={{ 
              width: currentStep === 1 ? "0%" : 
                     currentStep === 2 ? "33%" : 
                     currentStep === 3 ? "66%" : "100%" 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative mb-3"
              >
                {/* Neumorphic circle */}
                <div
                  className={`
                    w-[60px] h-[60px] rounded-full flex items-center justify-center
                    transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-gradient-to-br from-green-400 to-green-600 shadow-lg"
                        : isActive
                        ? "bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"
                        : "bg-gray-100 shadow-inner"
                    }
                  `}
                  style={{
                    boxShadow: isCompleted
                      ? "0 4px 20px rgba(34, 197, 94, 0.3), inset 0 1px 2px rgba(255,255,255,0.5)"
                      : isActive
                      ? "0 4px 20px rgba(59, 130, 246, 0.3), inset 0 1px 2px rgba(255,255,255,0.5)"
                      : "inset 2px 2px 5px rgba(0,0,0,0.1), inset -2px -2px 5px rgba(255,255,255,0.7)",
                  }}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  ) : (
                    <Icon
                      className={`w-7 h-7 ${
                        isActive ? "text-white" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>

                {/* Pulse animation for active step */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "rgba(59, 130, 246, 0.3)",
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>

              <span
                className={`text-sm text-center ${
                  isCompleted 
                    ? "text-green-600" 
                    : isActive 
                    ? "text-gray-900" 
                    : "text-gray-400"
                }`}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}