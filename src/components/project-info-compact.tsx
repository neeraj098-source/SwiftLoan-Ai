import { Brain, Zap, Shield, Clock } from "lucide-react";

export function ProjectInfoCompact() {
  const features = [
    {
      icon: Brain,
      title: "Multi-Agent AI",
      description: "Specialized autonomous agents collaborate to process your application",
      color: "rgb(59, 130, 246)",
    },
    {
      icon: Zap,
      title: "3-Min Processing",
      description: "Complete loan decisions in under 5 minutes with 98.7% accuracy",
      color: "rgb(249, 115, 22)",
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "End-to-end encryption with advanced fraud detection protocols",
      color: "rgb(34, 197, 94)",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "AI agents never sleep - apply anytime and get instant decisions",
      color: "rgb(168, 85, 247)",
    },
  ];

  return (
    <div
      className="bg-white rounded-2xl p-6"
      style={{
        boxShadow: "8px 8px 20px rgba(0,0,0,0.05), -8px -8px 20px rgba(255,255,255,0.9)",
      }}
    >
      <div className="mb-4">
        <h3 className="text-gray-900 mb-2">SwiftLoan AI Technology</h3>
        <p className="text-sm text-gray-600">
          Powered by autonomous AI agents that work together to deliver lightning-fast loan decisions with unmatched accuracy and transparency.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-gray-200 transition-all duration-300"
            style={{
              boxShadow: "3px 3px 8px rgba(0,0,0,0.04), -3px -3px 8px rgba(255,255,255,0.9)",
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                  boxShadow: `0 3px 10px ${feature.color}40, inset 0 1px 2px rgba(255,255,255,0.5)`,
                }}
              >
                <feature.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-gray-900 text-sm mb-1">{feature.title}</h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
