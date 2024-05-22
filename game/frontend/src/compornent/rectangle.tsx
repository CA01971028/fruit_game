import React ,{useState}from 'react'
import owlImage from '../img/owl.png';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

function Rectangle() {
  const [owl_width,setOwl_width] = useState<number>(45)
  const width_move:number = 2;
  const left_klick = () =>{
    setOwl_width(owl_width - width_move)
  }
  
  const right_klick = () => {
    setOwl_width(owl_width + width_move)
  }


  return (
    <>
      <div className="basket"></div>

      <Box component="img" src={owlImage} alt="フクロウ"height={100}width={100}sx={{position: 'relative',top: '-625px',left:`${owl_width}%`}}/>
      <Button variant="contained" sx={{ position: 'absolute', top: 30, left: '25%' }}onClick={left_klick}>left</Button>
      <Button variant="contained" sx={{ position: 'absolute', top: 30, left: '70%' }}onClick={right_klick}>right</Button>
    </>
    
  )
}

export default Rectangle
