import React, { useState, useEffect } from 'react';
import { Box, Slide } from '@mui/material';
import { Button, useTheme } from '@mui/material';
import '../css/compornent.css';
import { useNavigate } from 'react-router-dom';

import ham1 from '../img/hamster.png';
import ham2 from '../img/animal_hamster6.png';
import ham3 from '../img/animal_hamster5.png';
import ham4 from '../img/animal_hamster4.png';
import ham5 from '../img/animal_hamster3.png';
import ham6 from '../img/animal_hamster2.png';



const App: React.FC = () => {
  const theme = useTheme();
  const hamImages = [ham1, ham2, ham3, ham4, ham5, ham6];
  let [leftmrge,setLeftmrge] = useState<number>(200)
  const navigate = useNavigate();

  const onclick = ()=>{
    navigate('/account');
  }
  // while (leftmrge) {
  //   leftmrge += 1; // leftmrgeの値を1ずつ増加させる
  //   setLeftmrge(leftmrge); // leftmrgeの値を更新する
  // }
  

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 128, 0.5)',
          width: '100%',
          height: '100vh',
          position: 'relative',
          overflow: 'hidden',
        }}
      > <span className='mei'>ハムボール</span>
        <div className='hamtotal'>
        {hamImages.map((image, index) => (
          <Box
            key={index}
            className={`ham${index}`} 
            sx={{
              display: 'inline-block',
              position: 'relative',
            }}
          >
            <img src={image} alt={`Hamster ${index}`} height={"100px"} width={'100px'} />
          </Box>
          ))}
        </div>
      </Box>
      <Button sx={{
                  marginTop:'-35%;',
                  marginLeft:'40%',
                  width:'200px;'
                  }} variant="contained" onClick={onclick}>ログイン</Button>
    </>
  );
};


export default App;
