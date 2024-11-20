import React from 'react';
import { X } from 'lucide-react';
import type { CommunicationPlan } from '../../types/communication';
import { useStakeholderStore } from '../../store/stakeholders';
import { useCommunicationStore } from '../../store/communications';

interface AddCommunicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (plan: Omit<CommunicationPlan, 'id'>) => void;
}

export function AddCommunicationModal({
  isOpen,
  onClose,
  onAdd,
}: AddCommunicationModalProps) {
  const { stakeholders } = useStakeholderStore();
  const { handlers } = useCommunicationStore();
  const [formData, setFormData] = React.useState({
    title: '',
    type: 'email' as const,
    frequency: 'weekly' as const,
    stakeholderIds: [] as string[],
    description: '',
    template: '',
    nextScheduledDate: '',
    status: 'draft' as const,
    handler: undefined as CommunicationPlan['handler'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
    setFormData({
      title: '',
      type: 'email',
      frequency: 'weekly',
      stakeholderIds: [],
      description: '',
      template: '',
      nextScheduledDate: '',
      status: 'draft',
      handler: undefined,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              New Communication Plan
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as CommunicationPlan['type'],
                    })
                  }
                >
                  <option value="email">Email</option>
                  <option value="meeting">Meeting</option>
                  <option value="report">Report</option>
                  <option value="presentation">Presentation</option>
                  <option value="newsletter">Newsletter</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Frequency
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.frequency}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      frequency: e.target.value as CommunicationPlan['frequency'],
                    })
                  }
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="adhoc">Ad-hoc</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Communication Handler
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.handler?.id || ''}
                  onChange={(e) => {
                    const handler = handlers.find((h) => h.id === e.target.value);
                    setFormData({ ...formData, handler: handler });
                  }}
                >
                  <option value="">Select a handler</option>
                  {handlers.map((handler) => (
                    <option key={handler.id} value={handler.id}>
                      {handler.name} - {handler.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Next Scheduled Date
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.nextScheduledDate}
                  onChange={(e) =>
                    setFormData({ ...formData, nextScheduledDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows={2}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stakeholders
              </label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {stakeholders.map((stakeholder) => (
                  <label
                    key={stakeholder.id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={formData.stakeholderIds.includes(stakeholder.id)}
                      onChange={(e) => {
                        const newIds = e.target.checked
                          ? [...formData.stakeholderIds, stakeholder.id]
                          : formData.stakeholderIds.filter(
                              (id) => id !== stakeholder.id
                            );
                        setFormData({ ...formData, stakeholderIds: newIds });
                      }}
                    />
                    <span className="text-sm text-gray-700">
                      {stakeholder.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {formData.type === 'email' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Template
                </label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  rows={4}
                  value={formData.template}
                  onChange={(e) =>
                    setFormData({ ...formData, template: e.target.value })
                  }
                  placeholder="Dear {stakeholder},&#10;&#10;Your message here..."
                />
              </div>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Create Plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}