import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Stakeholder } from '../../types/stakeholder';

interface StakeholderEngagementChartProps {
  stakeholders: Stakeholder[];
}

export function StakeholderEngagementChart({ stakeholders }: StakeholderEngagementChartProps) {
  const engagementLevels = stakeholders.reduce((acc, stakeholder) => {
    const level = stakeholder.engagementScore >= 75 ? 'High' :
                 stakeholder.engagementScore >= 50 ? 'Medium' : 'Low';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(engagementLevels).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#4ade80', '#fbbf24', '#f87171'];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}