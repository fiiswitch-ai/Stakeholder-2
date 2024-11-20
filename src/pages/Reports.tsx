import React from 'react';
import { Download } from 'lucide-react';
import { StakeholderEngagementChart } from '../components/reports/StakeholderEngagementChart';
import { CommunicationStatusChart } from '../components/reports/CommunicationStatusChart';
import { RiskOverviewChart } from '../components/reports/RiskOverviewChart';
import { EngagementTrends } from '../components/reports/EngagementTrends';
import { useStakeholderStore } from '../store/stakeholders';
import { useCommunicationStore } from '../store/communications';
import { useRiskStore } from '../store/risks';

export function ReportsPage() {
  const { stakeholders } = useStakeholderStore();
  const { plans } = useCommunicationStore();
  const { risks } = useRiskStore();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Project insights and stakeholder engagement metrics
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Stakeholder Engagement</h2>
          <StakeholderEngagementChart stakeholders={stakeholders} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Communication Status</h2>
          <CommunicationStatusChart plans={plans} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Risk Overview</h2>
          <RiskOverviewChart risks={risks} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Engagement Trends</h2>
          <EngagementTrends stakeholders={stakeholders} />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">AI-Generated Insights</h2>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800">Stakeholder Engagement</h3>
            <p className="mt-1 text-sm text-blue-600">
              High-influence stakeholders show increased engagement this month. Consider leveraging
              their support for upcoming project milestones.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="text-sm font-medium text-yellow-800">Communication Patterns</h3>
            <p className="mt-1 text-sm text-yellow-600">
              Email response rates are declining. Consider diversifying communication channels
              or adjusting message frequency.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-sm font-medium text-green-800">Risk Management</h3>
            <p className="mt-1 text-sm text-green-600">
              Proactive risk mitigation strategies have reduced high-impact risks by 30%
              compared to last quarter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}