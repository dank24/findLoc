import React, { useState } from 'react'

import { places } from '../assets/locs'
import starClick from '../assets/images/icons/starClick.png'
import starDef from '../assets/images/icons/starDef.png'


const DropDownCard = (props) => {

  //Variables
  const [imgClicked, setImgClicked] = useState(false)


  let style = {
    position: 'absolute',
    width: '85%',
    height: '60%',
    backgroundColor: 'grey',
    zIndex: '1',
    top: '10%',
    left: '10%',
    border: '1px solid white',
    borderRadius: '4%',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2%'
  }

  let styles2 = {
    secs: {
        display: 'flex', 
        flexDirection: 'row',
        height: '45%',
        width: '98%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2%'
    },
    divs: {
        display: 'flex', 
        flexDirection: 'column',
        width: '47%',
        height: '98%',
        overFlow: 'scroll',
        borderLeft: '1px solid white',
        borderBottom: '1px solid white'
    },
    p: {
      fontSize: '19px',
      padding: '2px',
      width: '85%',
      border: '1px solid black',
      height: '100%',
      overFlow: 'hidden'
 
    }
  }

  let style3 = {
    div: {
      border: '1px solid gold', 
      height: '18%',
      display: 'flex',
      flexDirection: 'row',
      overFlow: 'hidden'
    }
  }

  // Appends
  let permSite = places.PermSite.map(its =>{
    return(
      <div style={style3.div}>
        <p id={`{"lat":"${its.lat}","lng":"${its.lng}","name":"${its.name}"}`} className='dropdown_p' style={styles2.p} key={its.lat}>{its.name}</p>
        <img id={its.name} onClick={props.handleClick} height='90%' width='10%' src={imgClicked ? starClick : starDef} />
      </div>
    ) 
  })


  // UI
  return (
    <main style={style} id='dropdown_card_main'>

      <section style={styles2.secs} id='dropdownCard_first_sec'>
          <div style={styles2.divs} id='1sec_1div'>

            <h3 style={{marginLeft: '2%', }}>Temp Site</h3>

            <div style={{marginLeft: '5%', border: '1px solid green', height: '85%'}}>
              
                {permSite}
                
            </div>
        
          </div>

          <div style={styles2.divs} id='1sec_2div'>
      
          </div>
      </section>

      <section style={styles2.secs} id='dropdownCard_second_sec'>
          <div style={styles2.divs} id='2sec_1div'>
             
          </div>

          <div style={styles2.divs} id='2sec_2div'>
              <h3 style={{marginLeft: '2%', }}>Perm Site</h3>
             
          </div>
      </section>

    </main>
  )
}

export default DropDownCard
