const api_key = 'AIzaSyCjWzAIoSJYb38wnavpQ6Wh4yER15NMcko'

export const direction = async (ref, deLat, deLng, map) => {
  const directionService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const useMap = directionsRenderer.setMap(map)
  console.log(ref)
  let dt = directionsRenderer.setPanel(ref.current)
//{lat: 6.13358, lng: 8.13880}

  const req = {
    origin: {lat: 6.13358, lng: 8.13880},
    destination: {lat: Number(deLat),lng: Number(deLng)},
    travelMode: 'WALKING'
  }

  directionService.route(req, (result, status) => {
    console.log(result)
    if(status == "OK"){
      console.log(result)
      directionsRenderer.setDirections(result)
    }
  })
}

export const updateDirection = (ref, or, des, map) =>{
  const directionService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const useMap = directionsRenderer.setMap(map)
  const panel = directionsRenderer.setPanel(ref)

  directionService.route(
    {
      origin: or,
      destination: des,
      travelMode: 'WALKING',
      optimizeWaypoints: true,
      provideRouteAlternatives: true
    }, 
    (resp, status) => {
      if(status === 'OK'){
        directionsRenderer.setDirections(resp)
      } else {
        console.log('Directions request failed', status)
      }
    }
  )
}