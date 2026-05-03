import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell
} from 'recharts';

interface ChartProps {
  data: any[];
  type: 'bar' | 'line';
  dataKey: string;
  nameKey?: string;
  color?: string;
}

const Charts: React.FC<ChartProps> = ({ data, type, dataKey, nameKey = "name", color = "#f89406" }) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-100 p-4 shadow-2xl min-w-[120px]">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 border-b border-slate-50 pb-2">{label}</p>
          <div className="space-y-3">
            {payload.map((item: any, index: number) => (
              <div key={index} className="flex flex-col">
                {item.payload.subject && (
                  <p className="text-secondary font-serif font-black text-xs italic leading-tight">{item.payload.subject}</p>
                )}
                <p className="text-xl font-serif font-black text-primary tracking-tighter leading-tight">
                  {item.value}%
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  if (type === 'bar') {
    return (
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey={nameKey} 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }}
              dy={15}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(248, 148, 6, 0.05)' }} />
            <Bar dataKey={dataKey} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey={nameKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#475569', fontSize: 10, fontWeight: 900 }}
            dy={15}
          />
          <YAxis hide domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={4} 
            dot={{ fill: color, strokeWidth: 2, r: 6, stroke: '#fff' }} 
            activeDot={{ r: 8, strokeWidth: 0, fill: color }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
