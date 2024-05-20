// App.tsx
import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Flask_account from './compornent/Flask_account';
import Flask from './compornent/Flask';
import { AuthProvider, useAuth } from './compornent/AuthContext';
import './App.css'
import './css/compornent.css'
import Background from './compornent/background'
import Score from './compornent/score'
import Ranking from './compornent/ranking'
import Next from './compornent/next'
import Next_block from './compornent/next_block';
import Rectangle from './compornent/rectangle';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* <Route path="/" element={<Flask_account />} />
        <Route path="/login" element={<ProtectedRoute component={Flask} />} /> */}
      </Routes>
      <Background />
      <Score />
      <Ranking />
      <Next />
      <Next_block />
      <Rectangle />
    </AuthProvider>
  );
};

const ProtectedRoute: React.FC<{ component: React.FC }> = ({ component: Component }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Component /> : <Navigate replace to="/" />;
};

export default App;
