import React, { useEffect, useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { places } from '../assets/locs2'
import starClick from '../assets/images/icons/starClick.svg'
import starDef from '../assets/images/icons/starDef.svg'

import { updUserInfo, getUserdata } from '../utils/userUtils'
import { userContext } from '../context/userContext'


const DropDownCard = (props) => {


  const {userData2, reGetUData, pushIntoErrors} = useContext(userContext)
  //Variables

  let userData = props.data
  const [imgClicked, setImgClicked] = useState(false)
  let [favesArray, setFavesArray] = useState(userData2.savedLocations)

  console.log(favesArray)

  const handleClick = (es,) =>{

    let siblingNode = es.target.previousElementSibling

    let starClickString = 'http://localhost:5173/src/assets/images/icons/starClick.svg'
    let starDefString = 'http://localhost:5173/src/assets/images/icons/starDef.svg'

    if(es.target.tagName == 'IMG'){
      let locText = siblingNode.innerHTML

      let obj = {
        name: 'faves',
        data: locText
      }

      updUserInfo(props.id, obj).then(
        resp => {
          if(resp.status == 'success' && resp.txt == 'Removed Successfully'){
            pushIntoErrors(resp.txt)
            setFavesArray(prev => (resp.data))
          }
          if(resp.status == 'success' && resp.txt == 'Added Successfully'){
            pushIntoErrors(resp.txt)
            setFavesArray(prev => (resp.data))
          }
          
        }
      )
    }


  }

  const handlePClick = async (e) => {
    if(e.target.tagName == 'P'){
      console.log(e.target.tagName)
      let locData = JSON.parse(e.target.id)
      let name = e.target.innerHTML
  
      let obj = {
        name: 'history',
        data: {
          name,
          ...locData
        }
      }
  
     
      updUserInfo(props.id, obj)
     .then(r => reGetUData())
    }

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

}, [favesArray])


  let style = {
    position: 'absolute',
    height: '60%',
    zIndex: '1',
    border: '1px solid white',
    borderRadius: '4%',
    display: 'flex', 
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2%',

    close: {
      color: 'red', position: 'absolute', right: '4%',
      top: '1%', cursor: 'pointer'
    }
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
        borderBottom: '1px solid white',
        gap: '5%'
    },
    p: {
      textOverflow: 'ellipsis',
      fontSize: '19px',
      padding: '2px',
      width: '80%',
      height: '100%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center'
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
      <div key={its.name} style={style3.div}>
        <p onClick={e => {props.handleClick(e); handlePClick(e)}} id={`{"lat":"${its.lat}","lng":"${its.lng}","name":"${its.name}"}`} className='dropdown_p' style={styles2.p} key={its.lat}>{its.name}</p>
        <img id={`{"lat": "${its.lat}", "lng": "${its.lng}"}`} onClick={e =>handleClick(e, its.name)} className='imgs' height='100%' width='13%' />
      </div>
    ) 
  })
  let termSite = places.TempSite.map(its =>{
    return(
      <div key={its.name} style={style3.div}>
        <p onClick={e => {props.handleClick(e); handlePClick(e)}} id={`{"lat":"${its.lat}","lng":"${its.lng}","name":"${its.name}"}`} className='dropdown_p' style={styles2.p} key={its.lat}>{its.name}</p>
        <img id={`{"lat": "${its.lat}", "lng": "${its.lng}"}`} onClick={e =>handleClick(e, its.name)} className='imgs' height='90%' width='10%' />
      </div>
    ) 
  })
  let lodges = places.lodges.map(its =>{
    return(
      <div  key={its.name} style={style3.div}>
        <p onClick={e => {props.handleClick(e); handlePClick(e)}} id={`{"lat":"${its.lat}","lng":"${its.lng}","name":"${its.name}"}`} className='dropdown_p' style={styles2.p} key={its.lat}>{its.name}</p>
        <img id={`{"lat": "${its.lat}", "lng": "${its.lng}"}`} onClick={e =>handleClick(e, its.name)} className='imgs' height='90%' width='10%' />
      </div>
    ) 
  })
  let admin = places.admin.map(its =>{
    return(
      <div key={its.name} style={style3.div}>
        <p onClick={e => {props.handleClick(e); handlePClick(e)}} id={`{"lat":"${its.lat}","lng":"${its.lng}","name":"${its.name}"}`} className='dropdown_p' style={styles2.p} key={its.lat}>{its.name}</p>
        <img id={`{"lat": "${its.lat}", "lng": "${its.lng}"}`} onClick={e =>handleClick(e, its.name)} className='imgs' height='90%' width='10%' />
      </div>
    ) 
  })



  // UI
  return (
    <main className='cards ignore' style={style} id='dropdown_card_main'>


    <h1 id='close_x' onClick={e => props.handleClick(e)} style={style.close}>X</h1>

      <section className='ignore' style={styles2.secs} id='dropdownCard_first_sec'>
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

      <section className='ignore' style={styles2.secs} id='dropdownCard_second_sec'>

          <div style={styles2.divs} id='2sec_1div'>
              
              <h3 style={{marginLeft: '2%', }}>Lodges</h3>

              <div className='divScroll' style={{marginLeft: '4%', border: '1px solid rgba(157, 175, 175, 0.534)', height: '85%',}}>
                
                  {lodges}
                  
              </div>
          </div>

          <div className='divScroll' style={styles2.divs} id='2sec_2div'>
              <h3 style={{marginLeft: '2%', }}>Administration</h3>
              <div className='divScroll' style={{marginLeft: '4%', border: '1px solid rgba(157, 175, 175, 0.534)', height: '85%',}}>
                
                {admin}
                
            </div>
          </div>
      </section>

    </main>
  )
}

export default DropDownCard
