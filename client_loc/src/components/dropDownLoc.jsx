import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { places } from '../assets/locs'
import starClick from '../assets/images/icons/starClick.svg'
import starDef from '../assets/images/icons/starDef.svg'

import { updUserInfo, getUserdata } from '../utils/userUtils'


const DropDownCard = (props) => {

  //Variables

  let userData = props.data
  console.log(userData.userfaves)
  const [imgClicked, setImgClicked] = useState(false)
  let [favesArray, setFavesArray] = useState(userData.userfaves)

  const handleClick = (es,) =>{

    let siblingNode = es.target.previousElementSibling

    let starClickString = 'http://localhost:5173/src/assets/images/icons/starClick.png'
    let starDefString = 'http://localhost:5173/src/assets/images/icons/starDef.png'

    let arr = ['DEP Of Anatomy', 'AE-FUNAI Solar Farm']

    if(es.target.src == starDefString){
      let locText = siblingNode.innerHTML
      es.target.src = starClick
      addToList(userData.userfaves, locText )
    }
    else {
      es.target.src = starDef
      let locText = siblingNode.innerHTML
      rmFromList(userData.userfaves, locText)
    }

    function rmFromList(arr, itR){
      if(arr.some(its => its === itR)){
        let i = arr.findIndex(it =>  it == itR)
        arr.splice(i, 1)
        
        let d = {
          name: 'faves',
          data: arr
        }
        updUserInfo(props.id, d)
        .then(resp => setFavesArray(resp.data.savedLocations))
      }
    }


    function addToList(arr, itA){
      if(!arr.some(it => it === itA)){
        arr.push(itA)
        
        let d = {
          name: 'faves',
          data: arr
        }
        updUserInfo(props.id, d)
        updUserInfo(props.id, d)
        .then(resp => setFavesArray(resp.data.savedLocations))
      }
    } 

    props.handleClick(es)


  }

  const handlePClick = (e) => {
    let locData = JSON.parse(e.target.id)
    let obj = {
      ...locData,
      name: e.target.innerHTML
    }

    if(!userData.userHistory.some(its => its.name == e.target.innerHTML)){
      let arr = [obj, ...userData.userHistory]
    }

    if(userData.userHistory.lenght > 5){
      arr.pop()
      console.log(arr)
    }
    let sData = {
      name: 'history',
      data: arr
    }

    updUserInfo(props.id, sData )
  }

  // useEffect
useEffect(() => {

  let imgs = document.querySelectorAll('.imgs') 

  imgs.forEach(e => {
    let siblText = e.previousElementSibling.innerHTML
    console.log('this happend')

    if(favesArray.some(its => its === siblText)){
      e.src = starClick
    } else {
      e.src = starDef
    }
  })

}, [])


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
        overflow: 'hidden',
        borderLeft: '1px solid white',
        borderBottom: '1px solid white',
        gap: '5%'
    },
    p: {
      textOverflow: 'ellipsis',
      fontSize: '19px',
      padding: '2px',
      width: '80%',
      height: '100%',
      overflow: 'hidden'
 
    }
  }

  let style3 = {
    div: {
      height: '19%',
      display: 'flex',
      flexDirection: 'row',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(157, 175, 200, 0.534)',

    }
  }

  // Appends
  let permSite = places.PermSite.map(its =>{
    return(
      <div style={style3.div}>
        <p onClick={e => {props.handleClick; handlePClick(e)}} id={`{"lat":"${its.lat}","lng":"${its.lng}","name":"${its.name}"}`} className='dropdown_p' style={styles2.p} key={its.lat}>{its.name}</p>
        <img id={`{"lat": "${its.lat}", "lng": "${its.lng}"}`} onClick={e =>handleClick(e, its.name)} className='imgs' height='100%' width='13%' />
      </div>
    ) 
  })
  let termSite = places.TempSite.map(its =>{
    return(
      <div style={style3.div}>
        <p onClick={props.handleClick} id={`{"lat":"${its.lat}","lng":"${its.lng}","name":"${its.name}"}`} className='dropdown_p' style={styles2.p} key={its.lat}>{its.name}</p>
        <img id={`{"lat": "${its.lat}", "lng": "${its.lng}"}`} onClick={e =>handleClick(e, its.name)} className='imgs' height='90%' width='10%' />
      </div>
    ) 
  })
  let lodges = places.lodges.map(its =>{
    return(
      <div style={style3.div}>
        <p onClick={props.handleClick} id={`{"lat":"${its.lat}","lng":"${its.lng}","name":"${its.name}"}`} className='dropdown_p' style={styles2.p} key={its.lat}>{its.name}</p>
        <img id={`{"lat": "${its.lat}", "lng": "${its.lng}"}`} onClick={e =>handleClick(e, its.name)} className='imgs' height='90%' width='10%' />
      </div>
    ) 
  })



  // UI
  return (
    <main style={style} id='dropdown_card_main'>

      <section style={styles2.secs} id='dropdownCard_first_sec'>
          <div style={styles2.divs} id='1sec_1div'>

            <h3 style={{marginLeft: '2%', }}>Perm Site</h3>

            <div className='divScroll' style={{marginLeft: '4%', border: '1px solid rgba(157, 175, 175, 0.534)', height: '85%'}}>
              
                {permSite}
                
            </div>
        
          </div>

          <div style={styles2.divs} id='1sec_2div'>

              <h3 style={{marginLeft: '2%', }}>Temp Site</h3>

              <div className='divScroll' style={{marginLeft: '4%', border: '1px solid rgba(157, 175, 175, 0.534)', height: '85%'}}>
                
                  {termSite}
                  
              </div>      
          </div>
      </section>

      <section style={styles2.secs} id='dropdownCard_second_sec'>

          <div style={styles2.divs} id='2sec_1div'>
              
              <h3 style={{marginLeft: '2%', }}>Lodges Site</h3>

              <div className='divScroll' style={{marginLeft: '4%', border: '1px solid rgba(157, 175, 175, 0.534)', height: '85%',}}>
                
                  {lodges}
                  
              </div>
          </div>

          <div className='divScroll' style={styles2.divs} id='2sec_2div'>
              <h3 style={{marginLeft: '2%', }}>Perm Site</h3>
             
          </div>
      </section>

    </main>
  )
}

export default DropDownCard
