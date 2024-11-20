import React from 'react';
import { Plus, Filter } from 'lucide-react';
import { RiskList } from '../components/risks/RiskList';
import { RiskMatrix } from '../components/risks/RiskMatrix';
import { AddRiskModal } from '../components/risks/AddRiskModal';
import { useRiskStore } from '../store/risks';

export function RisksPage() {
  const [view, setView] = React.useState<'list' | 'matrix'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const { risks, addRisk } = useRiskStore();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Risk Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage project risks
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Risk
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="p-4 sm:flex sm:items-center sm:justify-between">
            <div className="sm:w-0 sm:flex-1">
              <h2 className="text-lg font-medium text-gray-900">Risk Analysis</h2>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-4">
              <div className="flex rounded-md shadow-sm">
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    view === 'list'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  List View
                </button>
                <button
                  onClick={() => setView('matrix')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                    view === 'matrix'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Matrix View
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {view === 'list' ? (
            <RiskList risks={risks} />
          ) : (
            <RiskMatrix risks={risks} />
          )}
        </div>
      </div>

      <AddRiskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addRisk}
      />
    </div>
  );
}