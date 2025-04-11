import React, { use, useEffect, useState, useSyncExternalStore } from "react";
import { useRef } from "react";

import { uploadData } from "../utils/dataUtils";

const AdminDash = () => {
// Variables
    const locRef = useRef(null)
    let btnRef =  useRef(null)

    let [displayScreen, setDisplaySccreen] = useState({
        Overview: true,
        'Add Locations': false
    })

    const [inputData, setInputData] = useState('')
    const [typeData, setTypeData] = useState('')
    const [latlng, setLatlng] = useState({
        lat: '',
        lng: ''
    })

    let [pageData, setPageData] = useState({
        Category: '',
        Name: '',
        'lat/lng': '',
    })

    let conArr = [pageData.Category, pageData.Name, JSON.stringify(pageData['lat/lng'])]

  // Functions
  function sidebar(e) {
    let obj = {Overview: false, 'Add Locations': false}
    let {id } = e.target
    setDisplaySccreen({...obj, [id]: true})
  }

  function addLocation(e) {
    let {tagName, innerHTML} = e.target
  
  }

  let [count, setCount] = useState(0)
  let [btnText, setbtnTxt] = useState('Next') 

  let obj = {
    name: 'high',
    lat: '3433',
    reliance: '84urh'
}



  function nextBtn() {

    let s = document.querySelectorAll('.dataBtn')

        if(count == 0){
            setPageData(prev => (
                {...prev, Category: inputData}
            ))
            setInputData('')
        }
        if(count == 1){
            setPageData(prev => (
                {...prev, Name: inputData}
            ))
            setInputData('')
        }
        if(count == 2 ){
            setPageData(prev => (
                {...prev, "lat/lng": inputData}
            ))
            setInputData('')
            setLatlng('')
        }
     
        if(count <= 1 && btnText == 'Next'){
            setCount(count + 1)
        } else {
            setCount(50)
        }
        if(pageData["lat/lng"] != '' && btnText == "Confirm") {
            //setCount(0)
            uploadData(pageData)
            console.log('done')
        }
    
        
  }   

  function handleInput(e){
    let {value, type} = e.target
    setInputData(value)
  }

 function handleSelect(e){
    let {value} = e.target  
    setInputData(value)
    setTypeData(value)
}

 function handlelatLng(e) {
    let {id, value} = e.target
    setLatlng(prev => (
        {...prev, [id]: value}
    ))

    let obj = {
        lat: latlng.lat,
        lng: latlng.lng,
    }

    setInputData(obj)
 }

 function handleAddLocBtn(s) {
    setCount(s)
 }

 console.log(latlng)
  console.log(displayScreen)
  console.log(pageData)


  // Appends
  let arr = ['Overview', 'Add Locations']
  let appendSide = arr.map(its => (
    <h3 onClick={e => sidebar(e)} key={its} id={its}>{its}</h3>
  ))

  let arr2 = ['Category', 'Name', 'lat/lng']
  let appendLocations = arr2.map((its, index) => (
        <button onClick={e => handleAddLocBtn(index)} ref={btnRef} className="dataBtn" style={{...style.div.button,  backgroundColor: index === count ? 'blue': 'black'}}>{its}</button>
  ))

  let appendConfirm = arr2.map((its, index) => (
    <p style={{...style.p}} key={its}>{its}: <b style={style.b}>{conArr[index]}</b></p>
  ))

  useEffect(() =>{
    if(displayScreen['Add Locations'] && count == 1){
        locRef.current.focus()
    }
  }, [displayScreen["Add Locations"]])
  
  useEffect(() =>{
    if(pageData["lat/lng"] != '' && count == 50){
        setbtnTxt('Confirm') 
    } else {
        setbtnTxt('Next')
    }
  }, [count])

  // UI
  return(
    <main id="admin_main_cont">

        <section id="admin_first_sec">
            <div id="sec1_div1">
    
            </div>

            <div id="sec1_div2">
                { appendSide }
            </div>

        </section>

        <section id="admin_second_sec">
            {
                displayScreen['Add Locations'] &&
                <div onClick={addLocation} id="sec2_div1">

                    <div style={style}>
                        <div style={style.div}>
                           {appendLocations}
                        </div>

                        <div style={{width: '70%', height: '100%'}}>

                        {  count == 0 &&
                            <div style={style.type}>
                                <select onChange={handleSelect} style={style.type.child}>
                                    <option value='permsite'>PernSite</option>
                                    <option value='tempsite'>tempsite</option>
                                    <option value='popular'>popular</option>
                                </select>
                                <div style={{...style.type.child}}>{typeData}</div>
                            </div>
                        }    
                        { count == 1 &&<><input value={inputData} onChange={handleInput} ref={locRef} style={style.div.input} placeholder='seleBtn'/></>}

                        {  count == 2 &&
                            <div style={{...style.type, ...style.lat}}>
                                <input id="lat" value={latlng.lat} onChange={handlelatLng} style={style.lat.input} placeholder="Latitude"/>            
                                <input id="lng" value={latlng.lng} onChange={handlelatLng} style={style.lat.input} placeholder="Longitude"/>     
                            </div>

                        } 
                            <div style={{marginTop: '5%', height: '70%'}}>
                                { btnText == 'Next' && 
                                    <button onClick={nextBtn} style={style.btn}>{btnText}</button>
                                }

                                { appendConfirm }

                                { btnText == 'Confirm' &&
                                    <button onClick={nextBtn} style={style.btn}>{btnText}</button>
                                }

                            </div>
                        </div>
                    </div>


                </div>
            }
        </section>

    </main>
  )
}

export default AdminDash




let style = {
    color: 'white', border: '1px solid black',
    width: '100%', display: 'flex',
    height: '100%', backgroundColor: 'rgb(10, 20, 73)',

    lat: {
        gridTemplateColumns: '35% 35%',

        input: {
            fontSize: '16px', textAlign: 'center',
            height: '73%', borderRadius: '1rem', backgroundColor: ' #a0d4bc'
        }
    },

    type: {
        display: 'grid', width: '100%',
        height: '13%', gridTemplateColumns: '17% 30%', gap: '1%',
        justifyContent: 'center', alignItems: 'center',
        marginTop: '3%',

        child: {
            height: '76%', borderRadius: '5%', color: 'black', backgroundColor: 'blue',
            alignItems: 'center', justifyContent: 'center', display: 'flex'
        }
    },


    b: {marginLeft: '3%',display: 'block', marginTop: '1%',
        overflow: 'hidden',width: '100%', height: '75%',},

    p: {
        fontSize: '17px',marginLeft: '3%',
        width: '100%', height: '20%',
        textOverflow: 'wrap', display: 'flex', flexDirection: 'column',
        flexWrap: 'nowrap'
    },

    btn: {
        position: 'relative', borderRadius: '1rem',
        left: '70%', width: '23%', height: '29px',
        boxShadow: '2px 2px 2px blue'
    },

    div: {
        width: '30%', border: '2px solid gold', flexDirection: 'column',
        height: '100%', display: 'flex', gap: '1%', alignItems: 'center',

        button: {
            marginLeft: '1%', color: 'white',
            backgroundColor: 'black ',
            width: '90%', 
            height: '10%', borderRadius: '1rem',
        },

        input: {
            height: '15%', position: 'relative', left: '4%',
            width: '90%', marginLeft: '1%', border: '1px solid green',
            borderRadius: '1rem', marginTop: '4%', backgroundColor: ' #a0d4bc'
        }
    }

}