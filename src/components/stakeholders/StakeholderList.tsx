import React from 'react';
import { MoreVertical, Mail, Phone } from 'lucide-react';
import type { Stakeholder } from '../../types/stakeholder';
import { useStakeholderStore } from '../../store/stakeholders';

interface StakeholderListProps {
  stakeholders: Stakeholder[];
}

export function StakeholderList({ stakeholders }: StakeholderListProps) {
  const { removeStakeholder } = useStakeholderStore();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Influence/Interest
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Engagement
            </th>
            <th className="px-6 py-3 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {stakeholders.map((stakeholder) => (
            <tr key={stakeholder.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      stakeholder.name
                    )}&background=0D8ABC&color=fff`}
                    alt=""
                  />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {stakeholder.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {stakeholder.organization}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{stakeholder.role}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {`${stakeholder.influence}/${stakeholder.interest}`}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {stakeholder.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${stakeholder.engagementScore}%`,
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {stakeholder.engagementScore}%
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => window.location.href = `mailto:${stakeholder.email}`}
                  >
                    <Mail className="h-5 w-5" />
                  </button>
                  {stakeholder.phone && (
                    <button
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => window.location.href = `tel:${stakeholder.phone}`}
                    >
                      <Phone className="h-5 w-5" />
                    </button>
                  )}
                  <button className="text-gray-400 hover:text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}