import React from 'react'
import '../css/compornent.css'

function Allow() {
  return (
    <>
    <div style={{ position: 'absolute',fontSize: '40px', left:'60%',top:'5%'}}>⇘</div>
    <div style={{ position: 'absolute', transform: `rotate(50deg)`,fontSize: '40px', left:'75%',top:'35%'}}>⇘</div>
    <div style={{ position: 'absolute', transform: `rotate(120deg)`,fontSize: '40px', left:'60%',top:'70%'}}>⇘</div>
    <div style={{ position: 'absolute', transform: `rotate(180deg)`,fontSize: '40px', left:'22%',top:'65%'}}>⇘</div>
    <div style={{ position: 'absolute', transform: `rotate(230deg)`,fontSize: '40px', left:'8%',top:'30%'}}>⇘</div>
    <div className="curved-arrow"></div>
    </>
  )
}

export default Allow