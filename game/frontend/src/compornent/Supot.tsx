import Background from './Background'
import React from 'react'
import Score from './Score'
import Ranking from './Ranking'
import Next from './Next'
import Next_block from './Next_block';
import Rectangle from './Rectangle';
import Ball_display from './Ball_display'
import Ball from './Ball'

function Supot() {
  return (
    <>
    <Background/>
    <Score/>
    <Ranking/>
    <Next/>
    <Next_block/>
    <Rectangle/>
    <Ball_display />
    {/* <Ball /> */}
    </>
  )
}

export default Supot