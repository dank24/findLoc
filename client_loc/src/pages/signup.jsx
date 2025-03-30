import react from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../assets/stylesheets/main.css'

import {createUserApi, saveToLocal} from '../utils/userUtils.js'

const Signup = () =>{

  // Variables
  const navigate = useNavigate()
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

      createUserApi(dataS)
      .then(resp => {
        resp.status == 'success' ? 
        navigate('/login') : 
        console.log('failed')
      })
    }


  // UI
  return( 
    <main id="signup_main_cont">

        <section id="signup_first_sec">

          <form>
            <h2>Signup</h2>
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
              <input type="password" id="userPass" placeholder="Enter Password" value={signUpData.userPass} 
                  onChange={e => handleInput(e)}
                />
            </div>

            <div>
              <input type="password" id="conPass" placeholder="Confirm Password" value={signUpData.conPass} 
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