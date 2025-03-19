const api_key = 'AIzaSyCjWzAIoSJYb38wnavpQ6Wh4yER15NMcko'

export const direction = async (deLat, deLng, map) => {
  const directionService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const useMap = directionsRenderer.setMap(map)
//{lat: 6.13358, lng: 8.13880}

  const req = {
    origin: {lat: 6.13358, lng: 8.13880},
    destination: {lat: Number(deLat),lng: Number(deLng)},
    travelMode: 'WALKING'
  }

  directionService.route(req, (result, status) => {
    console.log(result)
    if(status == "OK"){
      directionsRenderer.setDirections(result)
    }
  })
}

