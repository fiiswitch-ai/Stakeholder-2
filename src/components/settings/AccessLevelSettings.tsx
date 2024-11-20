import React from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';
import { useAccessLevelStore } from '../../store/accessLevels';

export function AccessLevelSettings() {
  const { accessLevels, updateAccessLevel, removeAccessLevel, addAccessLevel } = useAccessLevelStore();
  const [newLevel, setNewLevel] = React.useState({
    name: '',
    permissions: {
      viewStakeholders: false,
      editStakeholders: false,
      viewCommunications: false,
      editCommunications: false,
      viewRisks: false,
      editRisks: false,
      viewReports: false,
      manageUsers: false,
    },
  });

  const handlePermissionChange = (levelId: string, permission: string, value: boolean) => {
    updateAccessLevel(levelId, {
      permissions: {
        ...accessLevels.find(level => level.id === levelId)?.permissions,
        [permission]: value,
      },
    });
  };

  const handleNewLevelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLevel.name.trim()) {
      addAccessLevel({
        name: newLevel.name,
        permissions: newLevel.permissions,
      });
      setNewLevel({
        name: '',
        permissions: {
          viewStakeholders: false,
          editStakeholders: false,
          viewCommunications: false,
          editCommunications: false,
          viewRisks: false,
          editRisks: false,
          viewReports: false,
          manageUsers: false,
        },
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Access Levels</h2>
          <p className="mt-1 text-sm text-gray-500">
            Define and manage access levels and their permissions
          </p>
        </div>

        <div className="p-4">
          <form onSubmit={handleNewLevelSubmit} className="mb-6">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="New access level name"
                value={newLevel.name}
                onChange={(e) => setNewLevel({ ...newLevel, name: e.target.value })}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Level
              </button>
            </div>
          </form>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access Level
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stakeholders
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Communications
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Risks
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Other
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accessLevels.map((level) => (
                  <tr key={level.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Users className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {level.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={level.permissions.viewStakeholders}
                            onChange={(e) =>
                              handlePermissionChange(
                                level.id,
                                'viewStakeholders',
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">View</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={level.permissions.editStakeholders}
                            onChange={(e) =>
                              handlePermissionChange(
                                level.id,
                                'editStakeholders',
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">Edit</span>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={level.permissions.viewCommunications}
                            onChange={(e) =>
                              handlePermissionChange(
                                level.id,
                                'viewCommunications',
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">View</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={level.permissions.editCommunications}
                            onChange={(e) =>
                              handlePermissionChange(
                                level.id,
                                'editCommunications',
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">Edit</span>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={level.permissions.viewRisks}
                            onChange={(e) =>
                              handlePermissionChange(
                                level.id,
                                'viewRisks',
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">View</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={level.permissions.editRisks}
                            onChange={(e) =>
                              handlePermissionChange(
                                level.id,
                                'editRisks',
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">Edit</span>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={level.permissions.viewReports}
                            onChange={(e) =>
                              handlePermissionChange(
                                level.id,
                                'viewReports',
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            View Reports
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={level.permissions.manageUsers}
                            onChange={(e) =>
                              handlePermissionChange(
                                level.id,
                                'manageUsers',
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            Manage Users
                          </span>
                        </label>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => removeAccessLevel(level.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}