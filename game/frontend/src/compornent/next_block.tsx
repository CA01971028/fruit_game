import React from 'react'
import { Box } from '@mui/material';

import ham1 from '../img/hamster.png';
import ham2 from '../img/animal_hamster6.png';
import ham3 from '../img/animal_hamster5.png';
import ham4 from '../img/animal_hamster4.png';
import ham5 from '../img/animal_hamster3.png';
import ham6 from '../img/animal_hamster2.png';

import Allow from "./Allow";


function next_block() {
  return (
    <div className="donut">
      {/* <Box component="img"src={ham1}alt="ハムスター各種"height={50}width={50}sx={{ position: 'absolute', top: '0px', left: '35%' }}/>
      <Box component="img"src={ham2}alt="ハムスター各種"height={50}width={50}sx={{ position: 'absolute', top: '20%', left: '70%' }}/>
      <Box component="img"src={ham3}alt="ハムスター各種"height={50}width={50}sx={{ position: 'absolute', top: '55%', left: '70%' }}/>
      <Box component="img"src={ham4}alt="ハムスター各種"height={50}width={50}sx={{ position: 'absolute', top: '75%', left: '35%' }}/>
      <Box component="img"src={ham5}alt="ハムスター各種"height={50}width={50}sx={{ position: 'absolute', top: '50%', left: '3%' }}/>
      <Box component="img"src={ham6}alt="ハムスター各種"height={50}width={50}sx={{ position: 'absolute', top: '12%', left: '8%' }}/>

      <Allow /> */}
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box component="img" src={ham1} alt="ハムスター各種" height={50} width={50} marginLeft={7} />
        <Box sx={{ ml: 2 }}>:50<strong>PT</strong></Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box component="img" src={ham2} alt="ハムスター各種" height={50} width={50} marginLeft={7}/>
        <Box sx={{ ml: 2 }}>:60<strong>PT</strong></Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box component="img" src={ham3} alt="ハムスター各種" height={50} width={50} marginLeft={7}/>
        <Box sx={{ ml: 2 }}>:70<strong>PT</strong></Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box component="img" src={ham4} alt="ハムスター各種" height={50} width={50} marginLeft={7}/>
        <Box sx={{ ml: 2 }}>:80<strong>PT</strong></Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box component="img" src={ham5} alt="ハムスター各種" height={50} width={50} marginLeft={7}/>
        <Box sx={{ ml: 2 }}>:90<strong>PT</strong></Box>
      </Box>
  </Box>
    </div>
  )
}

export default next_block
