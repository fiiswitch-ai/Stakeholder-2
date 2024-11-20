import React from 'react';
import { Shield, Key, Bell, Globe, Users } from 'lucide-react';
import { AccessLevelSettings } from '../components/settings/AccessLevelSettings';
import { LoginSettings } from '../components/settings/LoginSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { LocalizationSettings } from '../components/settings/LocalizationSettings';

export function SettingsPage() {
  const [activeTab, setActiveTab] = React.useState('access');

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your application preferences and security settings
        </p>
      </div>

      <div className="flex space-x-4 border-b">
        <button
          onClick={() => setActiveTab('access')}
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'access'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Shield className="h-4 w-4 mr-2" />
          Access Levels
        </button>
        <button
          onClick={() => setActiveTab('login')}
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'login'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Key className="h-4 w-4 mr-2" />
          Login Settings
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'notifications'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Bell className="h-4 w-4 mr-2" />
          Notifications
        </button>
        <button
          onClick={() => setActiveTab('localization')}
          className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'localization'
              ? 'border-indigo-500 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Globe className="h-4 w-4 mr-2" />
          Localization
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'access' && <AccessLevelSettings />}
        {activeTab === 'login' && <LoginSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'localization' && <LocalizationSettings />}
      </div>
    </div>
  );
}