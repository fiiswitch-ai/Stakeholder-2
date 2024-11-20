import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useAuthStore } from '../store/auth';

export function Header() {
  const { user } = useAuthStore();

  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex flex-1">
          <div className="flex w-full max-w-lg items-center">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, stakeholders..."
              className="ml-2 block w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
            <Bell className="h-6 w-6" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </button>

          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name || 'User'
              )}&background=0D8ABC&color=fff`}
              alt={user?.name}
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              {user?.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}