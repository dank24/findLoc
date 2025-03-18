const api_key = 'AIzaSyCjWzAIoSJYb38wnavpQ6Wh4yER15NMcko'

export const direction = async (map) => {
  const directionService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  const destination = new google.maps.LatLng(6.13557, 8.14467)
  console.log('this')

  const useMap = directionsRenderer.setMap(map)


  const req = {
    origin: {lat: 6.13358, lng: 8.13880},
    destination: {lat: 6.13336,lng: 8.13645},
    travelMode: 'WALKING'
  }

  directionService.route(req, (result, status) => {
    console.log(result)
    if(status == "OK"){
      directionsRenderer.setDirections(result)
    }
  })
}

