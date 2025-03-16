import React, { useState } from "react";

import '../assets/stylesheets/main.css'
import MapComp from "../components/map";
import LocationCard from "../components/locationCard";
import locations from '../assets/locs'


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

    //  Functions
    function getLocationData(n, l , ln) {
      let dets = {name: n, lat: l, lng: ln}
      setLocationData(dets)
    }
    console.log(locationData)

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
      )
    })


    // UI
    return (
  <>

      <div id="topBar">
          
      </div>

      <main id="home_main_cont">

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
                < MapComp />
              </div>

          </section>

      </main>
  </>


    )
}

export default Home