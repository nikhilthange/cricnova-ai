import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface WinProbChartProps {
  data: { over: number; prob1: number; prob2: number }[];
  team1Name: string;
  team2Name: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-slate-300 font-semibold mb-2">{`Over ${label}`}</p>
        <p className="text-[#2563EB] text-sm font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
        <p className="text-[#22C55E] text-sm font-medium">{`${payload[1].name}: ${payload[1].value}%`}</p>
      </div>
    );
  }
  return null;
};

export const WinProbabilityChart: React.FC<WinProbChartProps> = ({ data, team1Name, team2Name }) => {
  return (
    <div className="h-80 w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorProb1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorProb2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="over" stroke="#64748b" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
          <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} domain={[0, 100]} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="prob1" name={team1Name} stroke="#2563EB" fillOpacity={1} fill="url(#colorProb1)" stackId="1" />
          <Area type="monotone" dataKey="prob2" name={team2Name} stroke="#22C55E" fillOpacity={1} fill="url(#colorProb2)" stackId="1" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
