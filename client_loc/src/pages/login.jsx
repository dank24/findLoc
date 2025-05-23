import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../utils/userUtils";
import { userContext } from "../context/userContext";

const Login = () =>{

    const {  pushIntoErrors} = useContext(userContext)

  //  Variables
  const [userData, setUserData] = useState({
    userName: '',
    userPass: '',
  })
  const [dsbBtn, setDsbtn] = useState(false)
let navigate = useNavigate()


  

  //  Functions

    // Handle Inputs Function
const handleInput = (e) =>{
    let {id, value} = e.target

    setUserData(prev =>{
        return {...prev, [id]: value}
    })
}

    //  Handle Button Function
const handleBtn = (e) =>{
    e.preventDefault()
    
    console.log(userData)
    setDsbtn( prev => (true))


    let l = login(userData)
    .then(data => {
        if(data.status == 'success'){
            let userId = data.data._id
            localStorage.setItem('id', userId)
            pushIntoErrors('success')
            navigate(`/home/${userId}`).then(
                resp => setDsbtn(prev => (false))
            )
            
        }
        else if(data.status == 'failure'){
            pushIntoErrors('username or password incorrect')
            setDsbtn(prev => (true))
        } else {
            pushIntoErrors('server error')
            setDsbtn(prev => (false))
        }
    }) 
}


  // UI
  return(
    <div id="this">
    <main id="signup_main_cont">

<section id="signup_first_sec">

    <form>
        <h2>Login</h2>

        <div>
            <input id="userName" placeholder="Enter Username" value={userData.userName} 
                onChange={e => handleInput(e)}
                />
        </div>
        
        <div>
            <input id="userPass" placeholder="Enter Password" value={userData.userPass} 
                onChange={e => handleInput(e)}
                />
        </div>

        <button disabled={dsbBtn} onClick={e => handleBtn(e)}>
        Login
        </button>

    </form>

</section>

<section id="login_second_sec">

</section>

</main>
    </div>

  )
}

export default Login