import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../utils/userUtils";
import { userContext } from "../context/userContext";

const Login = () =>{

    const {setErrors, push: pushIntoErrors} = useContext(userContext)

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
    
    console.log(userData)


    let l = login(userData)
    .then(data => {
        if(data.status == 'success'){
            let userId = data.data._id
            localStorage.setItem('id', userId)
            navigate(`/home/${userId}`)
        }
        if(data.status == 'failure'){
            setErrors('could not login')
        } else {
            pushIntoErrors('could not work wanks')
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

                <p>Don't have an account ? <Link to='/signup'>signup</Link></p>
            </form>

        </section>

        <section id="login_second_sec">
        
        </section>

    </main>
  )
}

export default Login