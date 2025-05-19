
export const uploadData = (dataS) => {

    let sData = {
        category: dataS.Category,
        name: dataS.Name.toLowerCase(),
        lat: dataS['lat/lng'].lat,
        lng: dataS['lat/lng'].lng,
    }

    const api = fetch(`http://localhost:5378/data/storedata/`,{
     method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify(sData)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))  
}



export const storeLocal = (dataS) => {
     let obj = {
        category: dataS.Category,
        name: dataS.Name.toLowerCase(),
        lat: dataS['lat/lng'].lat,
        lng: dataS['lat/lng'].lng,
    }

    const api = fetch(`http://localhost:5378/data/storelocal`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(error => console.log(error)) 

   
}

