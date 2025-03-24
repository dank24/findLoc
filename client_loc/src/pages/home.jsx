import React, { useEffect, useState } from "react";
import { useParams, useLocation} from "react-router-dom";

import '../assets/stylesheets/main.css'
import MapComp from "../components/map";
import LocationCard from "../components/locationCard";
import {locations, places} from '../assets/locs'
import searchIcon from '../assets/images/icons/searchIcon.svg'
import targetIcon from '../assets/images/icons/targetIcon.svg'
import mapIcon from '../assets/images/icons/mapIconDef.svg'
import Search from "../components/search";

import starDef from '../assets/images/icons/starDef.png'
import starClick from '../assets/images/icons/starClick.png'

import { direction } from "../utils/mapUtils";
import { getUserdata } from "../utils/userUtils";
import DropDownCard from "../components/dropDownLoc";

const Home = () => {

    //  Variables

  const location = useLocation()
  const params = useParams()
  const userId = params.userId

  console.log(userId)
  console.log(location)

  const [userData, setUserData] =useState({
      userLocation: {},
      userfaves: [],
      userHistory: [],
      userSearch: [],
      userDynamicLoc: {}
  })
 
  const [locationData, setLocationData] = useState({
    lat: '',
    lng: '',
    name: '',
  }) 

  const [dirToLocation, setDirToLocation] = useState({
    dir: false
  })

 
  const [uiDisplay, setUiDisplay] = useState({
    searchBar: false,
    locations: false
  })

 

  //  Functions
    // get location data function
    function handleSideBar(n, l , ln) {
      let obj = {name: n, lat: l, lng: ln}
      let obj2 = {
        dir: true,
        destination: obj,
        origin: userData.userDynamicLoc
      }
      setDirToLocation(obj2)
    }

    // onClick event functions
    const onClickEvents = {
      search: () => {
          console.log('clik')
          setUiDisplay(prev => (
          {...prev, searchBar: !uiDisplay.searchBar}
          )) 
      },
      target: () => {
          console.log('clicked image')
          setLocationData(userData.userLocation)
          setDirToLocation({dir: false})

      },
      location: () =>{
          setUiDisplay(prev => (
            {...prev, locations: !uiDisplay.locations}
          ))
      },
      dropdownPlaces: (e, s) =>{
          let latLng = JSON.parse(e.target.id)

          let obj2 = {
            dir: true,
            destination: latLng,
            origin: userData.userLocation
          }

          setDirToLocation(obj2) 
      },
      starClick: () => {
        console.log('fuck')
        setStarImage(starDef)
      },
      phoneNav: () => {
        console.log('clicked')
      }
    }

    // get user location 
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(pos =>{
        let lat = pos.coords.latitude
        let lng = pos.coords.longitude
        
        let obj = {lat, lng}
        setUserData(prev => (
          {...prev, userLocation: obj}
        ))
      })
    }

    //  get user data
    let userDataUpd = async () =>{
      getUserdata(userId)
      .then(resp => {

        setUserData(prev => (
          {...prev, userfaves: resp.data.savedLocations, userHistory: resp.data.userHistory}
        ))
      

      })
    }


    // update location dynamically
    const getDynamicLocation = () =>{
      navigator.geolocation.watchPosition((pos) =>{
        let lat = pos.coords.latitude
        let lng  = pos.coords.longitude
  
        let obj = {lat, lng}

        setUserData(prev=> (
          {...prev, userDynamicLoc: obj}
        ))
      },  )
  
    }
  



  console.log(userData)

  let p = {
    fontSize: '19px',
    padding: '2px',
    width: '85%'
  }

console.log(userData.userHistory)

  // Appends
  const sideBarLocations = userData.userHistory.map(its => {
    return (
      < LocationCard 
        name = {its.name}
        key = {its.name}
        lenght = '20%'
        lat =  {its.lat}
        lng =  {its.lng}
        handleClick = {handleSideBar}

      />
    ) })
    


  //

  getDynamicLocation()
      
  // UseEffects
    useEffect(() =>{
      getUserLocation()
     userDataUpd()
    }, [])
    

  // UI
    return (
  <div id="mainCont">

      <div id="topBar">

        <div id="topbarFirstDiv">
          
          <div onClick={onClickEvents.search} className="image_div">
            <img width='100%' height='100%' src={searchIcon} />  
          </div>

          <div className="image_div" onClick={onClickEvents.location} style={{backgroundColor: 'gray'}} >
            <img src={mapIcon} width='100%' height='100%' />
          </div>
          
        </div>



      </div>

      <main style={{}} id="home_main_cont">

            {
              uiDisplay.searchBar &&
              < Search />
            }

            {
              uiDisplay.locations &&
              < DropDownCard 
                  handleClick  = {onClickEvents.dropdownPlaces}
                  data = {userData}
                  id = {userId}
              />
            }



          <section id="home_first_sec">

              <div id="sec1_div1">
                <h1>Recent</h1>
              </div>

              <div id="sec1_div2">
                {sideBarLocations}
              </div>

              <div id="1sec_div2">

              </div>

          </section>

          <section id="home_second_sec">
      
              <div id="map_div">
                <img onClick={onClickEvents.target} width='5%' src={targetIcon} id="target_icon"/> 
                < MapComp 
                    dir = {dirToLocation.dir ? 'true': 'false'}
                    lat = {locationData.lat}
                    lng = {locationData.lng}
                    name = {locationData.name}
                    direction = {dirToLocation}
                    phoneNavClick = {onClickEvents.phoneNav}
                />
              </div>
          </section>

      </main>
  </div>


    )
}

export default Home