//  Create A New User and Save To Db
export const createUserApi = async (dataS) => {
    let api =  fetch('http://localhost:5378/user/createUser', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dataS)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

//  Login a User
export const login = async (dataS) => {
    let s;
    let api = await fetch(`http://localhost:5378/user/login/${dataS.userName}`)
    .then(resp => resp.json())
    .then(data => {
        s = data
    })
    .catch(error => {
        s = error
    })
    return s
}

//  getUserData
export const updUserInfo = async (id, sData) => {
    let api = fetch(`http://localhost:5378/user/upduserinfo/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(sData)
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
}

//  Save to LocalStorage
export const saveToLocal = (dataS) =>{

    let s = JSON.parse(localStorage.getItem('localDb'))
    s.push(dataS)
    
    localStorage.setItem('localDb', JSON.stringify(s))

    console.log(JSON.parse(localStorage.getItem('localDb')))
}
