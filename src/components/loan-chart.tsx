import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { month: "Jan", applications: 45, approved: 42 },
  { month: "Feb", applications: 52, approved: 48 },
  { month: "Mar", applications: 61, approved: 57 },
  { month: "Apr", applications: 58, approved: 55 },
  { month: "May", applications: 70, approved: 66 },
  { month: "Jun", applications: 78, approved: 74 },
];

export function LoanChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="bg-white rounded-2xl p-6"
      style={{
        boxShadow: "8px 8px 20px rgba(0,0,0,0.05), -8px -8px 20px rgba(255,255,255,0.9)",
      }}
    >
      <div className="mb-6">
        <h3 className="text-gray-900">Loan Applications Overview</h3>
        <p className="text-gray-500 text-sm mt-1">Monthly applications and approval trends</p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorApplications" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="rgb(34, 197, 94)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="rgb(34, 197, 94)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "12px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          />
          <Area
            type="monotone"
            dataKey="applications"
            stroke="rgb(59, 130, 246)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorApplications)"
          />
          <Area
            type="monotone"
            dataKey="approved"
            stroke="rgb(34, 197, 94)"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorApproved)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <span className="text-sm text-gray-600">Applications</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">Approved</span>
        </div>
      </div>
    </motion.div>
  );
}
