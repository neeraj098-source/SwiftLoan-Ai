import { TrendingUp, Clock, DollarSign, Users } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
  delay: number;
}

function StatCard({ icon: Icon, label, value, color, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="bg-white rounded-2xl p-6"
      style={{
        boxShadow: "8px 8px 20px rgba(0,0,0,0.05), -8px -8px 20px rgba(255,255,255,0.9)",
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}20, ${color}40)`,
            boxShadow: `0 4px 15px ${color}30, inset 0 1px 2px rgba(255,255,255,0.5)`,
          }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className="flex-1">
          <p className="text-gray-500 text-sm">{label}</p>
          <p className="text-gray-900 mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function LoanStats() {
  const stats = [
    { icon: Clock, label: "Avg. Processing Time", value: "3.5 minutes", color: "rgb(59, 130, 246)" },
    { icon: DollarSign, label: "Total Approved", value: "$2.4M", color: "rgb(34, 197, 94)" },
    { icon: Users, label: "Active Applications", value: "127", color: "rgb(168, 85, 247)" },
    { icon: TrendingUp, label: "Approval Rate", value: "94%", color: "rgb(249, 115, 22)" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          color={stat.color}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}
