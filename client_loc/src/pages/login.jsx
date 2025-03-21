import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../utils/userUtils";

const Login = () =>{

  //  Variables
  const [userData, setUserData] = useState({
    userName: '',
    userPass: '',
  })
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
    
    let l = login(userData)
    .then(data => {
        if(data.status == 'success'){
            let userId = data.data._id
            navigate(`/home/${userId}`)
        }
        if(data.status == 'failure'){
            
        }
    })
}


  // UI
  return(
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

                <button onClick={e => handleBtn(e)}>
                Login
                </button>

            </form>

        </section>

        <section id="login_second_sec">
        
        </section>

    </main>
  )
}

export default Login