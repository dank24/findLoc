import react from "react";
import { useState, useEffect } from "react";

import '../assets/stylesheets/main.css'

const Signup = () =>{

  // Variables
    const [signUpData, setSignUpData] = useState({
        userName: '',
        userMail: '',
        userPass: '',
        conPass: '',
    })

    console.log(signUpData)

  // Functions
    //  input OnChange function
    function handleInput(e) {
      let {id, value} = e.target

      setSignUpData(prev => {
        return { ...prev, [id]: value }
      })

    }

    //  handle button click function
    function handleBtn(e) {
      e.preventDefault()
      let dataS = signUpData
      console.log(dataS) 
    }


  // UI
  return(
    <main id="signup_main_cont">

        <section id="signup_first_sec">

          <h1>jsijsji</h1>

          <form>
            <h2>Login</h2>
            <div>
              <input id="userName" placeholder="Enter Username" value={signUpData.userName} 
                  onChange={e => handleInput(e)}
                />
            </div>
            
            <div>
              <input id="userMail" placeholder="Enter Mail" value={signUpData.userMail} 
                  onChange={e => handleInput(e)}
                />
            </div>

            <div>
              <input id="userPass" placeholder="Enter Password" value={signUpData.userPass} 
                  onChange={e => handleInput(e)}
                />
            </div>

            <div>
              <input id="conPass" placeholder="Confirm Password" value={signUpData.conPass} 
                  onChange={e => handleInput(e)}
                />
            </div>

            <button onClick={e => handleBtn(e)}>
              Signup
            </button>

          </form>

        </section>

        <section id="login_second_sec">
        
        </section>

    </main>
  )

}

export default Signup