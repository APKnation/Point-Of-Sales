import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

import MainLayout from './layouts/MainLayout';

// Placeholder for now
const POS = () => <div className="p-8"><h1 className="text-2xl font-bold">POS Interface</h1></div>;
const Products = () => <div className="p-8"><h1 className="text-2xl font-bold">Products</h1></div>;

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pos" element={<POS />} />
              <Route path="/products" element={<Products />} />
              <Route path="/categories" element={<div>Categories</div>} />
              <Route path="/sales" element={<div>Sales History</div>} />
              <Route path="/customers" element={<div>Customers</div>} />
              <Route path="/settings" element={<div>Settings</div>} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
