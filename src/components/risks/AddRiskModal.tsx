import React from 'react';
import { X } from 'lucide-react';
import type { Risk } from '../../types/risk';
import { useStakeholderStore } from '../../store/stakeholders';

interface AddRiskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (risk: Omit<Risk, 'id' | 'dateIdentified' | 'dateUpdated'>) => void;
}

export function AddRiskModal({ isOpen, onClose, onAdd }: AddRiskModalProps) {
  const { stakeholders } = useStakeholderStore();
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    category: 'communication' as const,
    probability: 'medium' as const,
    impact: 'medium' as const,
    status: 'identified' as const,
    owner: '',
    stakeholderIds: [] as string[],
    responses: [],
    triggers: [] as string[],
  });

  const [newTrigger, setNewTrigger] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
    setFormData({
      title: '',
      description: '',
      category: 'communication',
      probability: 'medium',
      impact: 'medium',
      status: 'identified',
      owner: '',
      stakeholderIds: [],
      responses: [],
      triggers: [],
    });
  };

  const handleAddTrigger = () => {
    if (newTrigger.trim()) {
      setFormData({
        ...formData,
        triggers: [...formData.triggers, newTrigger.trim()],
      });
      setNewTrigger('');
    }
  };

  const handleRemoveTrigger = (index: number) => {
    setFormData({
      ...formData,
      triggers: formData.triggers.filter((_, i) => i !== index),
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
            <h2 className="text-xl font-semibold text-gray-900">Add New Risk</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                Description
              </label>
              <textarea
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as Risk['category'],
                    })
                  }
                >
                  <option value="communication">Communication</option>
                  <option value="stakeholder">Stakeholder</option>
                  <option value="technical">Technical</option>
                  <option value="organizational">Organizational</option>
                  <option value="external">External</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Owner
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.owner}
                  onChange={(e) =>
                    setFormData({ ...formData, owner: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Probability
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.probability}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      probability: e.target.value as Risk['probability'],
                    })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Impact
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.impact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      impact: e.target.value as Risk['impact'],
                    })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Affected Stakeholders
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Risk Triggers
              </label>
              <div className="mt-2 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={newTrigger}
                    onChange={(e) => setNewTrigger(e.target.value)}
                    placeholder="Add a trigger..."
                  />
                  <button
                    type="button"
                    onClick={handleAddTrigger}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.triggers.map((trigger, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
                    >
                      <span className="text-sm text-gray-700">{trigger}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTrigger(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

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
                Add Risk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}