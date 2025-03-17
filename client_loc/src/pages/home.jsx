import React, { useState } from "react";

import '../assets/stylesheets/main.css'
import MapComp from "../components/map";
import LocationCard from "../components/locationCard";
import locations from '../assets/locs'
import searchIcon from '../assets/images/icons/searchIcon.png'
import Search from "../components/search";


const Home = () => {

    //  Variables
  const [userData, setUserData] =useState({
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
         setUiDisplay(prev => {
          return {...prev, searchBar: !uiDisplay.searchBar}
        }) 
      }
    }
    console.log(uiDisplay)

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
  
      

    // UI
    return (
  <>

      <div id="topBar">
        <div>
          <div onClick={onClickEvents.search} id="image_div">
            <img width='30px' height='30px' src={searchIcon} />
         
          </div>
          <h1>=</h1>
        </div>
      </div>

      <main id="home_main_cont">

          {
              uiDisplay.searchBar &&
              < Search />
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