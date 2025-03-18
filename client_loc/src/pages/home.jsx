import React, { useEffect, useState } from "react";

import '../assets/stylesheets/main.css'
import MapComp from "../components/map";
import LocationCard from "../components/locationCard";
import DropDownCard from "../components/dropDownLoc";
import locations from '../assets/locs'
import searchIcon from '../assets/images/icons/searchIcon.png'
import targetIcon from '../assets/images/icons/targetIcon.png'
import mapIcon from '../assets/images/icons/mapIconDef.png'
import Search from "../components/search";


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

 
  const [uiDisplay, setUiDisplay] = useState({
    searchBar: false,
    locations: false
  })


  //  Functions
    // get location data function
    function getLocationData(n, l , ln) {
      let dets = {name: n, lat: l, lng: ln}
      setLocationData(dets)
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
      },
      location: () =>{
          setUiDisplay(prev => (
            {...prev, locations: !uiDisplay.locations}
          ))
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

  // Appends
  const sideBarLocations = locations.map(its => {
    return (
      < LocationCard 
        name = {its.name}
        key = {its.name}
        lenght = '10%'
        lat =  {its.lat}
        lng =  {its.lng}
        handleClick = {getLocationData}
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
            <img disable={true} src={mapIcon} width='95%' height='80%' />
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
              < DropDownCard />
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
                    lat = {locationData.lat}
                    lng = {locationData.lng}
                    name = {locationData.name}
                />
              </div>

          </section>

      </main>
  </>


    )
}

export default Home