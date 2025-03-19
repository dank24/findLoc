import React from 'react'

import { places } from '../assets/locs'

const DropDownCard = (props) => {

  //Variables


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
      width: '100%'
    }
  }

  // Appends


  // UI
  return (
    <main style={style} id='dropdown_card_main'>

      <section style={styles2.secs} id='dropdownCard_first_sec'>
          <div style={styles2.divs} id='1sec_1div'>
              <h3 style={{marginLeft: '2%', }}>TEMP SITE</h3>
              <div style={{marginLeft: '7%'}}>
                {props.tempSite}
              </div>
          </div>

          <div style={styles2.divs} id='1sec_2div'>
              <h3 style={{marginLeft: '2%', }}>PERM SITE</h3>
              <div style={{marginLeft: '7%'}}>
                {props.permSite}
              </div>
          </div>
      </section>

      <section style={styles2.secs} id='dropdownCard_second_sec'>
          <div style={styles2.divs} id='2sec_1div'>
              <h3 style={{marginLeft: '2%', }}>Lodges</h3>
              <div style={{marginLeft: '7%', overflow: 'scroll', overflowX: 'hidden',}}>
                {props.lodges}
              </div>
          </div>

          <div style={styles2.divs} id='2sec_2div'>
              <h3 style={{marginLeft: '2%', }}>Perm Site</h3>
             
          </div>
      </section>

    </main>
  )
}

export default DropDownCard
