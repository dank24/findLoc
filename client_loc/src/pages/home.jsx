import React, { useState } from "react";

import '../assets/stylesheets/main.css'

const Home = () => {

  //  Variables
const [userData, setUserData] =useState({
    userfaves: [],
    userHistory: [],
    userSearch: [],
})

  //  Functions


  // UI
  return (
<>

    <div id="topBar">
        
    </div>

    <main id="home_main_cont">

        <section id="home_first_sec">

            <div id="sec1_div1">
               <input id="searchInp" placeholder="enter Location"/>
               <button>Search</button> 
            </div>

            <div id="1sec_2div">
               <h1>Recent</h1>
            </div>

            <div id="1sec_div2">

            </div>

        </section>

        <section id="home_second_sec">
    
            <div id="map_div">

            </div>

        </section>

    </main>
</>


  )
}

export default Home