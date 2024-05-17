// App.tsx
import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Flask_account from './compornent/Flask_account';
import Supot from './compornent/Supot'
import { AuthProvider, useAuth } from './compornent/AuthContext';
import './App.css'
import './css/compornent.css'



const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Flask_account />} />
        <Route path="/login" element={<ProtectedRoute component={Supot} />} />
      </Routes>
    </AuthProvider>
  );
};

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Component /> : <Navigate replace to="/" />;
};

export default App;
