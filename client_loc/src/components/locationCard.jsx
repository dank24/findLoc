import React, { useState } from "react";

import locations from '../assets/locs'
import mapIconDef from '../assets/images/icons/mapIconDef.png'
import mapIconClick from '../assets/images/icons/mapIconClick.png'


const LocationCard = (props) =>{

  // Variables
  const [locDets, setLocDet] = useState({
    lat: '',
    lng: '',
    location: ''
  })


  // Functions
 const handleClick = (name, lat, lng) =>{
    let  d = {name, lat, lng}
    setLocDet(d)
 }

console.log(locDets)

  // Styles
  let style = {
    main: {
        width: '100%',
        height: props.lenght,
    },
    div: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        border: '1px solid white',
        borderRadius: '2%',
        gap: '4%',
        alignItems: 'center'
    },
    img: {
        width: '20%',
        height: '80%'
    },
    h1: {
        width: '90%'
    }
  }

  // Attach
    let appendLoc = 
            <div key={props.name} onClick={e => handleClick(props.name, props.lat, props.lng)} style={style.div}>
                <img style={style.img} src={mapIconDef} alt="an img"/>
                <h3 id={props.name} style={style.h1}>{props.name}</h3>
            </div>


  // UI
  return (

    <main style={style.main}>
        {appendLoc}
    </main>

  )
}

export default LocationCard