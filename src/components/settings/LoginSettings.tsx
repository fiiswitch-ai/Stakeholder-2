import React from 'react';
import { Key, Shield } from 'lucide-react';
import { useLoginSettingsStore } from '../../store/loginSettings';

export function LoginSettings() {
  const { settings, updateSettings } = useLoginSettingsStore();

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Login Security</h2>
          <p className="mt-1 text-sm text-gray-500">
            Configure authentication and security settings
          </p>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Key className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Password Requirements
                  </h3>
                  <p className="text-sm text-gray-500">
                    Set minimum requirements for user passwords
                  </p>
                </div>
              </div>
              <div className="space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="number"
                    min="8"
                    max="32"
                    value={settings.minPasswordLength}
                    onChange={(e) =>
                      updateSettings({
                        minPasswordLength: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Minimum Length
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-2 ml-7">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.requireUppercase}
                  onChange={(e) =>
                    updateSettings({ requireUppercase: e.target.checked })
                  }
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Require uppercase letter
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.requireNumbers}
                  onChange={(e) =>
                    updateSettings({ requireNumbers: e.target.checked })
                  }
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Require numbers
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.requireSpecialChars}
                  onChange={(e) =>
                    updateSettings({ requireSpecialChars: e.target.checked })
                  }
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Require special characters
                </span>
              </label>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-gray-400" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Session Security
                  </h3>
                  <p className="text-sm text-gray-500">
                    Configure session timeout and security settings
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-4 ml-7">
              <div>
                <label className="block text-sm text-gray-700">
                  Session timeout (minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="1440"
                  value={settings.sessionTimeout}
                  onChange={(e) =>
                    updateSettings({
                      sessionTimeout: parseInt(e.target.value, 10),
                    })
                  }
                  className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enforcePasswordExpiry}
                  onChange={(e) =>
                    updateSettings({ enforcePasswordExpiry: e.target.checked })
                  }
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Enforce password expiry
                </span>
              </label>

              {settings.enforcePasswordExpiry && (
                <div className="ml-6">
                  <label className="block text-sm text-gray-700">
                    Password expiry period (days)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="365"
                    value={settings.passwordExpiryDays}
                    onChange={(e) =>
                      updateSettings({
                        passwordExpiryDays: parseInt(e.target.value, 10),
                      })
                    }
                    className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              )}

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableMFA}
                  onChange={(e) =>
                    updateSettings({ enableMFA: e.target.checked })
                  }
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-600">
                  Enable Multi-Factor Authentication
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}