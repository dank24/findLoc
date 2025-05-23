import React, { useEffect, useState, useContext } from "react";
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
import ProfileMenu from "../components/profileMenu";
import ErrorMsg from "../components/errorMsg";

import { userContext } from "../context/userContext";

const Home = () => {

  const {userData2, errors} = useContext(userContext)
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
    locations: false,
    profile: false
  })

  let clearUi = {
    searchBar: false,
    locations: false,
    profile: false,
  }
 

  //  Functions
    // get location data function
    function handleSideBar(e, n, l , ln) {
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
      mainSec: (e) => {
        setUiDisplay(clearUi)

      },
      profile: () => {
           setUiDisplay(clearUi)
          setUiDisplay(prev => (
            {...prev, profile: !uiDisplay.profile}
          ))
      },
      search: () => {
          setUiDisplay(clearUi)

          setUiDisplay(prev => (
          {...prev, searchBar: !uiDisplay.searchBar}
          )) 

          if(uiDisplay.locations){
            onClickEvents.location()
          }
      },
      target: () => {
          console.log('clicked image')
          setLocationData(userData.userLocation)
          setDirToLocation({dir: false})

      },
      location: () =>{
          setUiDisplay(clearUi)
          setUiDisplay(prev => (
            {...prev, locations: !uiDisplay.locations}
          ))

          if(uiDisplay.searchBar){
            onClickEvents.search()
          }
          
      },
      dropdownPlaces: (e, s) =>{
        if(e.target.id !== 'close_x'){
          let latLng = JSON.parse(e.target.id)
          let obj2 = {
            dir: true,
            destination: latLng,
            origin: userData.userLocation
          }
          if(e.target.tagName == 'P'){
            setUiDisplay(clearUi)
          }
          setDirToLocation(obj2)  
        } else {
          setUiDisplay(clearUi)
        }
          console.log(e.target.innerHTML)
 
          
      },
      starClick: () => {
        console.log('fuck')
        setStarImage(starDef)
      },
      phoneNav: () => {
        console.log('clicked')
      },
      searchSelect: (e) =>{
        let obj = {
          dir: true,
          destination: {lat: e.lat, lng: e.lng},
          origin: userData.userLocation
        }
        setDirToLocation(obj)
        onClickEvents.search()
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
        if(resp.status == 'OK'){
          setUserData(prev => (
            {...prev, userfaves: resp.data.data.savedLocations, userHistory: resp.data.data.userHistory}
          ))
        }
        console.log(resp)

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
  



  let p = {
    fontSize: '19px',
    padding: '2px',
    width: '85%'
  }

  // Appends
  const sideBarLocations = userData2.userHistory.length > 0 && 
    userData2.userHistory.map(its => {
      return (
        < LocationCard 
          name = {its.name}
          key = {its.name}
          lenght = '25%'
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
      //userDataUpd()
    }, [])
    

  // UI
    return (
  <div id="mainCont">

    <div id="topBar">

        <div id="topbarFirstDiv">
          
          <div onClick={onClickEvents.profile} className="p_div image_div">
            <p className="homeImgs" >S</p> 
          </div>

          <div onClick={onClickEvents.search} className="image_div">
            <img className="homeImgs" width='100%' height='100%' src={searchIcon} />  
          </div>

          <div className="image_div" onClick={onClickEvents.location} style={{backgroundColor: 'gray'}} >
            <img className="homeImgs" src={mapIcon} width='100%' height='100%' />
          </div>
          
        </div>

        <div id="topbarSecondDiv">

        </div>

    </div>

    {
              uiDisplay.profile &&
              < ProfileMenu
                userEmgail = {userData.userEmail}
                  userName = {userData.userName}
              />
            }

            {
              uiDisplay.searchBar &&
              < Search 
                handleClick = {onClickEvents.searchSelect}
              />
            }

            {
              uiDisplay.locations &&
              < DropDownCard 
                  handleClick  = {onClickEvents.dropdownPlaces}
                  data = {userData}
                  id = {userId}
              />
            }


      <main disabled={true} onClick={e => onClickEvents.mainSec(e)} id="home_main_cont">

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

          <img width='37px' onClick={onClickEvents.target} src={targetIcon} id="target_icon"/> 


          <section id="home_second_sec">
      
              <div id="map_div">
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
  </div>


    )
}

export default Home