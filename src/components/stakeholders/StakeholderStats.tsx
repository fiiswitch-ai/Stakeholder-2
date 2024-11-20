import React from 'react';
import { Users, UserPlus, UserMinus, Activity } from 'lucide-react';
import type { Stakeholder } from '../../types/stakeholder';

interface StakeholderStatsProps {
  stakeholders: Stakeholder[];
}

export function StakeholderStats({ stakeholders }: StakeholderStatsProps) {
  const stats = [
    {
      name: 'Total Stakeholders',
      value: stakeholders.length,
      icon: Users,
      change: '+4.75%',
      changeType: 'positive',
    },
    {
      name: 'Key Players',
      value: stakeholders.filter((s) => s.influence === 'high' && s.interest === 'high')
        .length,
      icon: UserPlus,
      change: '+2.02%',
      changeType: 'positive',
    },
    {
      name: 'Low Engagement',
      value: stakeholders.filter((s) => s.engagementScore < 30).length,
      icon: UserMinus,
      change: '-1.39%',
      changeType: 'negative',
    },
    {
      name: 'Avg. Engagement',
      value: `${Math.round(
        stakeholders.reduce((acc, s) => acc + s.engagementScore, 0) /
          stakeholders.length
      )}%`,
      icon: Activity,
      change: '+3.24%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
        >
          <dt>
            <div className="absolute rounded-md bg-indigo-500 p-3">
              <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">
              {stat.name}
            </p>
          </dt>
          <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p
              className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}