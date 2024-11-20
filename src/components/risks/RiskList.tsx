import React from 'react';
import { AlertTriangle, MoreVertical, User, Calendar } from 'lucide-react';
import type { Risk } from '../../types/risk';
import { useStakeholderStore } from '../../store/stakeholders';

interface RiskListProps {
  risks: Risk[];
}

export function RiskList({ risks }: RiskListProps) {
  const { stakeholders } = useStakeholderStore();

  const getStakeholderNames = (ids: string[]) => {
    return ids
      .map((id) => stakeholders.find((s) => s.id === id)?.name)
      .filter(Boolean)
      .join(', ');
  };

  const getRiskSeverityColor = (probability: string, impact: string) => {
    if (probability === 'high' && impact === 'high') return 'bg-red-100 text-red-800';
    if (probability === 'high' || impact === 'high') return 'bg-orange-100 text-orange-800';
    if (probability === 'low' && impact === 'low') return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'identified':
        return 'bg-gray-100 text-gray-800';
      case 'analyzing':
        return 'bg-blue-100 text-blue-800';
      case 'mitigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'monitoring':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Risk
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Severity
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Owner
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stakeholders
            </th>
            <th className="px-6 py-3 bg-gray-50"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {risks.map((risk) => (
            <tr key={risk.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {risk.title}
                    </div>
                    <div className="text-sm text-gray-500">{risk.description}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="capitalize text-sm text-gray-900">
                  {risk.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getRiskSeverityColor(
                    risk.probability,
                    risk.impact
                  )}`}
                >
                  {`${risk.probability}/${risk.impact}`}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    risk.status
                  )}`}
                >
                  {risk.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">{risk.owner}</span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {getStakeholderNames(risk.stakeholderIds)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}