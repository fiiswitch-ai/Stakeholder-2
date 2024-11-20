import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { StakeholdersPage } from './pages/Stakeholders';
import { CommunicationsPage } from './pages/Communications';
import { RisksPage } from './pages/Risks';
import { ReportsPage } from './pages/Reports';

// Mock login for demonstration
const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'manager' as const,
};

function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900">Project Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Active Projects</h2>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">12</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Stakeholders</h2>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">48</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-medium text-gray-900">Open Actions</h2>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">24</p>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        <div className="mt-4 rounded-lg bg-white shadow">
          <div className="divide-y divide-gray-200">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 text-sm">AI</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      AI Insight Generated
                    </p>
                    <p className="text-sm text-gray-500">
                      Stakeholder engagement pattern detected for Project X
                    </p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-sm text-gray-500">2h ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const { isAuthenticated, login } = useAuthStore();

  React.useEffect(() => {
    // Auto-login for demonstration
    login(mockUser);
  }, [login]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/stakeholders" element={<StakeholdersPage />} />
              <Route path="/communications" element={<CommunicationsPage />} />
              <Route path="/risks" element={<RisksPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<div className="p-6">Settings Module</div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;