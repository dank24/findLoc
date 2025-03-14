//  Create A New User and Save To Db
const createUserApi = async (dataS) => {
    let api =  fetch('http://localhost:5378/user/createUser', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dataS)
    })
    .then(resp => {
        console.log(dataS)

    })
    .catch(error => console.error(error))  
}

//  Save to LocalStorage
const SaveToLocal = (dataS) =>{

    let s = JSON.parse(localStorage.getItem('localDb'))
    s.push(dataS)
    
    localStorage.setItem('localDb', JSON.stringify(s))

    console.log(JSON.parse(localStorage.getItem('localDb')))
}

export default SaveToLocal