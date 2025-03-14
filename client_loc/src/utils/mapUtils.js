const api_key = 'AIzaSyCjWzAIoSJYb38wnavpQ6Wh4yER15NMcko'


  let map;
  let div = document.querySelector('#map_div')
  async function initMap(params) {
    const location = {lat: -25.344, lng: 131.031}
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(div, {
        zoom: 4,
        mapId: "DEMO_MAP_ID",
    })

    let marker = new AdvancedMarkerElement({
        map: map,
        title: 'Uluru'
    })
  }

  export const mapDisplay = () =>{
    initMap()
    return(console.log('run'))
  }