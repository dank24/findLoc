import React, { useEffect, useState, useRef } from "react";

const MapComp = (props) => {
  //  Variables
    const [mapLocData, setMapLocData] = useState({
        lat: '',
        lng: '',
        name: '',
    })
    const api_key =  'AIzaSyCjWzAIoSJYb38wnavpQ6Wh4yER15NMcko'
    let mapRef = useRef(null)

  //  Functions

    //  Maping function
    const initMap2 = async (lat, lng, title) =>{

        let position = {lat: lat, lng: lng,}
        let {Map} = await google.maps.importLibrary('maps')
        let {AdvancedMarkerElement} = await google.maps.importLibrary('marker')

        let attMap = new Map(mapRef.current, {
            center: position,
            zoom: 15,
            mapId: 'DEMO_MAP_ID'
        })
        let attMarker = new AdvancedMarkerElement({
            map: attMap,
            position: position,
            title: title
        })
    }
    
    // Stles
    const style = {
        width: '100%',
        height: '100%',
        backgroundColor:'red'
    }

  // UseEffects
 useEffect(() =>{
    initMap2(6.131973147874651, 8.141276842329257, "Funia")
 }, [])


    // UI
    return(
        <main id="map_cont" style={style}>

            <div style={style} ref={mapRef} > </div>

        </main>
    )
}

export default MapComp