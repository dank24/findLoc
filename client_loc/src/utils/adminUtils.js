
export const storeLoc = async(sData) =>{
    const api = await fetch(`http://localhost:5378/data/storedata/${sData}`, {
        method: 'POST',
        headers: {
            "CONTENT-TYPE": "APPLICATION/JSON",
            "ACCEPT": "APPLICATION/JSON",
        },
        body: JSON.stringify(sData)
    })
    .then(res => console.log(res.json()))
    .catch(error => console.log(error))
}