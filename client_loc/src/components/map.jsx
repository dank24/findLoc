import React, { useEffect, useState, useRef, memo} from "react";
import { useLocation } from "react-router-dom";

import { direction, } from "../utils/mapUtils";

const MapComp = (props) => {
  //  Variables
    const mapLocData = {
        lat: Number(props.lat),
        lng: Number(props.lng),
        name: props.name,
    }

    const [userCoorinates, setUsercCoordinates] = useState({})

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

        console.log(props.direction.destination)

        if(props.dir == 'true'){
            let deLat = props.direction.destination.lat
            let deLng = props.direction.destination.lng
            let orLat = props.direction.origin.lat
            let orLng = props.direction.origin.lng
          direction(deLat, deLng, attMap)
        }

    }
    
    // Stles
    const style = {
        width: '100%',
        height: '100%',
    }

    console.log(mapLocData)

  // UseEffects
 useEffect(() =>{
    //initMap2(6.131973147874651, 8.141276842329257, "Funia")
    initMap2(mapLocData.lat, mapLocData.lng, mapLocData.name)
 }, [mapLocData])


    // UI
    return(
        <main id="map_cont" style={style}>

            <div style={style} ref={mapRef} > </div>

            <div>
                <select>
                    <option>gthos</option>
                </select>

                <select>

                </select>

            </div>

        </main>
    )
}

export default memo(MapComp)