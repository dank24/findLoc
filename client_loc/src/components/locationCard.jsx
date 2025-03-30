import React, { useState } from "react";

import mapIconDef from '../assets/images/icons/mapIconDef.svg'
import mapIconClick from '../assets/images/icons/mapIconClick.svg'


const LocationCard = (props) =>{

  // Variables
  const [locDets, setLocDet] = useState({
    lat: '',
    lng: '',
    location: ''
  })


  // Functions
  const handleMouseOver = (e) => {
    console.log(e.target.childNodes)
  }

  // Styles
  let style = {
    main: {
        width: '98.7%',
        height: props.lenght,
    },
    div: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        border: '1px solid white',
        borderRadius: '2%',
        gap: '0%',
        alignItems: 'center'
    },
    img: {
        width: '30%',
        height: '90%'
    },
    h1: {
        width: '98%',
        fontSize: '17px'
    }
  }

  // Attach
    let appendLoc = 
            <div key={props.name} onClick={e => {props.handleClick(props.name, props.lat, props.lng)}} style={style.div}>
                <img style={style.img} src={mapIconDef} alt="an img"/>
                <p id={props.name} style={style.h1}>{props.name}</p>
            </div>


  // UI
  return (

    <main className="loc_card_cont" style={style.main}>
        {appendLoc}
    </main>

  )
}

export default LocationCard