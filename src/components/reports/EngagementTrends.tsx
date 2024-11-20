import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Stakeholder } from '../../types/stakeholder';

interface EngagementTrendsProps {
  stakeholders: Stakeholder[];
}

export function EngagementTrends({ stakeholders }: EngagementTrendsProps) {
  // Simulate historical data for demonstration
  const data = [
    { month: 'Jan', average: 65 },
    { month: 'Feb', average: 68 },
    { month: 'Mar', average: 72 },
    { month: 'Apr', average: 75 },
    { month: 'May', average: 71 },
    { month: 'Jun', average: 74 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="average"
          stroke="#6366f1"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}