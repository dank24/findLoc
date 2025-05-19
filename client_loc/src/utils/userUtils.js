//  Create A New User and Save To Db
export const createUserApi = async (dataS) => {
    let s;
    let api =  await fetch('http://localhost:5378/user/createUser', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dataS)
    })
    .then(resp => resp.json())
    .then(data => s = data)
    .catch(error => console.error(error))
    return s
}

//  Login a User
export const login = async (dataS) => {
    let r = JSON.stringify(dataS)
    let s;
    let api = await fetch(`http://localhost:5378/user/login/${r}`)
    .then(resp => resp.json())
    .then(data => {
        s = data
    })
    .catch(error => {
        s = error
    })
    return s
}

//  update UserData
export const updUserInfo = async (id, sData) => {
    let s;
     let api = await fetch(`http://localhost:5378/user/upduserinfo/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(sData)
    })
    .then(resp => resp.json())
    .then(data => {console.log(data); s = data})
    .catch(error => console.error(error)) 
    return s
}

//  get user data 
 export const getUserdata = async (id) => {
        let s;
    let api = await fetch(`http://localhost:5378/user/getuserdata/${id}`)
    .then(resp => resp.json())
    .then(data => {
        s = {status: 'OK', data: data}
    })
    .catch(error => s =  {status: 'Failure', data: error})
    return (s)
 }


//  Save to LocalStorage
export const saveToLocal = (dataS) =>{

    let s = JSON.parse(localStorage.getItem('localDb'))
    s.push(dataS)
    
    localStorage.setItem('localDb', JSON.stringify(s))

    console.log(JSON.parse(localStorage.getItem('localDb')))
}
