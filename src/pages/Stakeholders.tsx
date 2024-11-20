import React from 'react';
import { Plus, Filter, Download } from 'lucide-react';
import { StakeholderMatrix } from '../components/stakeholders/StakeholderMatrix';
import { StakeholderList } from '../components/stakeholders/StakeholderList';
import { StakeholderStats } from '../components/stakeholders/StakeholderStats';
import { AddStakeholderModal } from '../components/stakeholders/AddStakeholderModal';
import { useStakeholderStore } from '../store/stakeholders';

export function StakeholdersPage() {
  const [view, setView] = React.useState<'list' | 'matrix'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const { stakeholders, addStakeholder } = useStakeholderStore();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Stakeholder Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and analyze project stakeholders
          </p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Stakeholder
          </button>
        </div>
      </div>

      <StakeholderStats stakeholders={stakeholders} />

      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <div className="p-4 sm:flex sm:items-center sm:justify-between">
            <div className="sm:w-0 sm:flex-1">
              <h2 className="text-lg font-medium text-gray-900">
                Stakeholder Analysis
              </h2>
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
            <StakeholderList stakeholders={stakeholders} />
          ) : (
            <StakeholderMatrix stakeholders={stakeholders} />
          )}
        </div>
      </div>

      <AddStakeholderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addStakeholder}
      />
    </div>
  );
}