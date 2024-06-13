// Flask_account.tsx
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
});

const LoginCard = styled('div')({
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
});

const Flask_account: React.FC = () => {
  const [inputData, setInputData] = useState<string>('');
  const [inputData2, setInputData2] = useState<string>('');
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();
  // ログインボタンが押された際のイベント
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [inputData, inputData2] }),
      });
      const responseData = await response.json();
      console.log(responseData.name); // バックエンドからのレスポンスをコンソール表示
      if (responseData.success) {
        setLoggedIn(true);
        navigate('/login');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error("送信中にエラーが発生しました:", error);
    }
  };
  // サインアップを押された際のイベント
  const signupSubmit = () => {
    navigate('/Flask_addaccount');
  };
  
  return (
    <form>
      <Container>
        <LoginCard>
          <Typography variant="h5" gutterBottom>ログイン</Typography>
          <TextField variant="outlined" margin="normal" fullWidth label="ユーザー名" value={inputData} onChange={(e) => setInputData(e.target.value)} />
          <TextField variant="outlined" margin="normal" fullWidth label="パスワード" type="password" value={inputData2} onChange={(e) => setInputData2(e.target.value)} />
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>ログイン</Button>
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }} onClick={signupSubmit}>サインアップ</Button>
        </LoginCard>
      </Container>
    </form>
  );
};

export default Flask_account;
