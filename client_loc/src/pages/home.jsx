import React, { useEffect, useState } from "react";

import '../assets/stylesheets/main.css'
import MapComp from "../components/map";
import LocationCard from "../components/locationCard";
import {locations, places} from '../assets/locs'
import searchIcon from '../assets/images/icons/searchIcon.png'
import targetIcon from '../assets/images/icons/targetIcon.png'
import mapIcon from '../assets/images/icons/mapIconDef.png'
import Search from "../components/search";

import starDef from '../assets/images/icons/starDef.png'
import starClick from '../assets/images/icons/starClick.png'

import { direction } from "../utils/mapUtils";
import DropDownCard from "../components/dropDownLoc";

const Home = () => {

    //  Variables
  const [userData, setUserData] =useState({
      userLocation: {},
      userfaves: [],
      userHistory: [],
      userSearch: [],
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

  const [starImage, setStarImage] = useState(starClick)


  //  Functions
    // get location data function
    function handleSideBar(n, l , ln) {
      let obj = {name: n, lat: l, lng: ln}
      let obj2 = {
        dir: true,
        destination: obj,
        origin: userData.userLocation
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
      dropdownPlaces: (e) =>{
     /*      let obj = JSON.parse(e.target.id)
          let obj2 = {
            dir: true,
            destination: obj,
            origin: userData.userLocation
          }
          setDirToLocation(obj2) */
          console.log(e.target.tagName)
      },
      starClick: () => {
        console.log('fuck')
        setStarImage(starDef)
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



  console.log(userData)

  let p = {
    fontSize: '19px',
    padding: '2px',
    width: '85%'
  }

  // Appends
  const sideBarLocations = locations.map(its => {
    return (
      < LocationCard 
        name = {its.name}
        key = {its.name}
        lenght = '10%'
        lat =  {its.lat}
        lng =  {its.lng}
        handleClick = {handleSideBar}
      />
    ) })
    


  //
      
  // UseEffects
    useEffect(() =>{
      getUserLocation()
    }, [])
    

  // UI
    return (
  <>

      <div id="topBar">
        <div>
          
          <div onClick={onClickEvents.search} id="image_div">
            <img width='30px' height='30px' src={searchIcon} />  
          </div>

          <div onClick={onClickEvents.location} style={{height: '100%', width: '20%', backgroundColor: 'grey'}}>
            <img src={mapIcon} width='95%' height='80%' />
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
                />
              </div>

          </section>

      </main>
  </>


    )
}

export default Home