import React, { useEffect, useState, useRef } from "react";

const MapComp = () => {
  //  Variables
    const api_key =  'AIzaSyCjWzAIoSJYb38wnavpQ6Wh4yER15NMcko'
    let MapEle = document.querySelector('#map_div')

  //  Functions
    // Initial map function
     async function initMap(){

        //6.131973147874651, 8.141276842329257

        let position = {lat: 6.131973147874651, lng: 8.141276842329257}
        let {Map} = await google.maps.importLibrary("maps")
        let {AdvancedMarkerElement} = await google.maps.importLibrary('marker')

        let attMap = new Map(MapEle, {
            center: position,
            zoom: 20,
            mapId: 'DEMO_MAP_ID'
        })

        let attMarker = new AdvancedMarkerElement({
            map: attMap,
            position: position,
            title: 'Uluru'
        })
     }
    
    const style = {
        width: '100%',
        height: '100%',
        backgroundColor:'red'
    }

 useEffect(() =>{
    initMap()
 }, [])


    // UI
    return(
        <main id="map_cont" style={style}>

            <div id="map_div"> </div>

        </main>
    )
}

export default MapComp