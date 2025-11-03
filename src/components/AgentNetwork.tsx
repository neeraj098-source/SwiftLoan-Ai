import React from 'react';
import { Bot, Shield, TrendingUp, CheckCircle } from 'lucide-react';

interface Agent {
  id: number;
  name: string;
  status: 'active' | 'idle' | 'completed';
  role: string;
}

interface AgentNetworkProps {
  agents: Agent[];
}

const AgentNetwork: React.FC<AgentNetworkProps> = ({ agents }) => {
  const getAgentIcon = (name: string) => {
    switch (name) {
      case 'Intake Agent': return <Bot className="w-5 h-5" />;
      case 'Verification Agent': return <Shield className="w-5 h-5" />;
      case 'Underwriting Agent': return <TrendingUp className="w-5 h-5" />;
      case 'Decision Agent': return <CheckCircle className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Agent Network</h2>
      <p className="text-gray-600 text-sm mb-6">Autonomous processing system</p>
      
      <div className="space-y-4">
        {agents.map(agent => (
          <div key={agent.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {getAgentIcon(agent.name)}
              <div>
                <p className="font-medium text-gray-800">{agent.name}</p>
                <p className="text-sm text-gray-600">{agent.role}</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              agent.status === 'active' ? 'bg-green-100 text-green-800' :
              agent.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {agent.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentNetwork;