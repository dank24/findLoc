import React, { useState } from "react";

const Login = () =>{

  //  Variables
  const [userData, setUserData] = useState({
    userName: '',
    userPass: '',
  })
  

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