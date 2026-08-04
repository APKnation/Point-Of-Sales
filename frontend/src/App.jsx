import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './routes/ProtectedRoutes';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Products from './pages/Products';
import Customers from './pages/Customers';
import SalesHistory from './pages/SalesHistory';
import MainLayout from './layouts/MainLayout';

import Categories from './pages/Categories';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route element={<ProtectedRoutes />}>
            <Route element={<MainLayout />}>
              <Route element={<ProtectedRoutes allowedRoles={['ROLE_ADMIN', 'ROLE_MANAGER']} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/sales" element={<SalesHistory />} />
                <Route path="/reports" element={<Reports />} />
              </Route>
              
              <Route element={<ProtectedRoutes allowedRoles={['ROLE_ADMIN']} />}>
                <Route path="/settings" element={<Settings />} />
              </Route>
              
              {/* Accessible by Cashier as well */}
              <Route path="/pos" element={<POS />} />
              <Route path="/customers" element={<Customers />} />
            </Route>
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
