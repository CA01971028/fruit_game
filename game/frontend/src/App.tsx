import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Flask_account from './compornent/Flask_account';
import Supot from './compornent/Supot'
import Flask_addaccount from './compornent/Flask_addaccount';
import { AuthProvider, useAuth } from './compornent/AuthContext';
import './App.css'
import './css/compornent.css'
import Start_display from './compornent/Start_display'


const App: React.FC = () => {
  return (
    // <AuthProvider>
    //   <Routes>
    //     <Route path="/" element={<Start_display />} />
    //     <Route path="/account" element={<Flask_account />} />
    //     <Route path="/login" element={<ProtectedRoute component={Supot} />} />
    //     <Route path="/Flask_addaccount" element={<Flask_addaccount />} />
    //   </Routes>
    // </AuthProvider>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Start_display />} />
        <Route path="/account" element={<Supot />} />
      </Routes>
    </AuthProvider>
  );
};

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Component /> : <Navigate replace to="/" />;
};

export default App;
