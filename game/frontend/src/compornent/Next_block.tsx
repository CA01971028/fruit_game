import { Box } from '@mui/material';

import ham1 from '../img/hamster.png';
import ham2 from '../img/animal_hamster6.png';
import ham3 from '../img/animal_hamster5.png';
import ham4 from '../img/animal_hamster4.png';
import ham5 from '../img/animal_hamster3.png';
import ham6 from '../img/animal_hamster2.png';


function next_block() {
  return (
    <>
      <div className="donut">
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box component="img" src={ham1} alt="ハムスター各種" height={50} width={50} marginLeft={7} />
        <Box  sx={{ ml: 2, fontSize:'2em'}}>:50<strong>PT</strong></Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box component="img" src={ham2} alt="ハムスター各種" height={50} width={50} marginLeft={7}/>
        <Box  sx={{ ml: 2 , fontSize:'2em'}}>:60<strong>PT</strong></Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box component="img" src={ham3} alt="ハムスター各種" height={50} width={50} marginLeft={7}/>
        <Box  sx={{ ml: 2 , fontSize:'2em'}}>:70<strong>PT</strong></Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box component="img" src={ham4} alt="ハムスター各種" height={50} width={50} marginLeft={7}/>
        <Box  sx={{ ml: 2 , fontSize:'2em'}}>:80<strong>PT</strong></Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box component="img" src={ham5} alt="ハムスター各種" height={50} width={50} marginLeft={7}/>
        <Box  sx={{ ml: 2 , fontSize:'2em'}}>:90<strong>PT</strong></Box>
      </Box>
    </Box>
    </div>
    <span style={{ position:'absolute',backgroundColor: 'rgb(250, 160, 252)',height:'200px',width:'200px',borderRadius: '10px',marginTop:'-20%',left:'20%'}}>
    <Box component="img" src={ham6} alt="ハムスター各種" height={70} width={70} marginLeft={0} sx={{position:'absolute',top:'30%',display:'inline'}}/>
    <Box  sx={{ fontSize:'2em',position:'absolute',display:'inline',top:'35%',left:'40%'}}>:-200<strong>PT</strong></Box>
    </span>
    </>
    
  )
}

export default next_block