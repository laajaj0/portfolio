
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider, useData } from './context/DataContext';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useData();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

import GlobalErrorBanner from './components/GlobalErrorBanner';

function App() {
  console.log('App Details:', { env: import.meta.env.MODE, build: new Date().toISOString() });
  return (
    <DataProvider>
      <GlobalErrorBanner />
      {/* Fixed: Removed the 'future' prop from HashRouter because it's not recognized by the current react-router-dom version's types. */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </DataProvider>
  );
}

export default App;
