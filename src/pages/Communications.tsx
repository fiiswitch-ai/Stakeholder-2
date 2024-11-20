import React from 'react';
import { Plus, Calendar, MessageSquare } from 'lucide-react';
import { CommunicationList } from '../components/communications/CommunicationList';
import { CommunicationCalendar } from '../components/communications/CommunicationCalendar';
import { AddCommunicationModal } from '../components/communications/AddCommunicationModal';
import { useCommunicationStore } from '../store/communications';

export function CommunicationsPage() {
  const [view, setView] = React.useState<'list' | 'calendar'>('list');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const { plans, addPlan } = useCommunicationStore();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Communication Planning</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage stakeholder communications and schedules
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                view === 'list'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="h-4 w-4 inline-block mr-2" />
              List View
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-4 py-2 text-sm font-medium rounded-r-md ${
                view === 'calendar'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Calendar className="h-4 w-4 inline-block mr-2" />
              Calendar View
            </button>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Communication Plan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        {view === 'list' ? (
          <CommunicationList plans={plans} />
        ) : (
          <CommunicationCalendar plans={plans} />
        )}
      </div>

      <AddCommunicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addPlan}
      />
    </div>
  );
}