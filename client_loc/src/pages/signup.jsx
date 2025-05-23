import react, { use } from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useRouteLoaderData } from "react-router-dom";

import '../assets/stylesheets/main.css'

import {createUserApi, saveToLocal} from '../utils/userUtils.js'
import { userContext } from "../context/userContext.jsx";
import bcrypt from 'bcryptjs'

const Signup = () =>{

  // Variables

  const navigate = useNavigate()
  const {pushIntoErrors} = use(userContext)

  const [errMsgs, setErrMsgs] = useState({
    userName: ['Username too short', 'username not available', ],
    userEmail: ['invalid email address', ''],
    userPass: ['password word should be in the form'],
    userconPass: 'passwords do not match',
  })
  const [checkValid, setCheckValid] = useState({
    validUsername: false,
    validEmail: false,
    validPassword: false,
    validConPass: true,
    validbtn: false
  })
  const [encPass, setEncPass] = useState({
    basePass: '',
    salt: '',
    hashedPass: ''
  })
  const [dsbBtn, setDsbBtn] = useState(true)

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

      if(id == 'userPass'){
        setEncPass(prev => (
          {...prev, basePass: value}
        ))

      } else {
        setSignUpData(prev => {
          return { ...prev, [id]: value }
        })  
      }

    }

    //  handle button click function
    function handleBtn(e) {
      e.preventDefault()
      let dataS = {
        ...signUpData,
        salt: encPass.salt
      }
      console.log(dataS)

      if(checkValid.validConPass){
        createUserApi(dataS)
        .then(resp => {
          if(resp.status == 'success'){
            pushIntoErrors('Account Created')
            navigate('/login') 
          } else {
            pushIntoErrors('username not available')
          }  
        }) 
      } else {
        console.log('error')
        pushIntoErrors('Server Error')
      }

    }

    //  encrypt pass functions
    async function encryptPass(){

      try {
        let newSalt = await bcrypt.genSalt(10)
        setEncPass(prev => (
          {...prev, salt: newSalt}
        ))
        
        let hashedPass = await bcrypt.hash(encPass.basePass, newSalt)

        setSignUpData(prev => (
          {...prev, userPass: hashedPass}
        ))

      } catch (error) {
        console.log(error)
      }

    }

    //  check valid
    function valid(pass, conpass) {
      if(pass !== conpass){
        setCheckValid(prev => (
          {...prev, validConPass: false}
        ))
        setDsbBtn(prev => (false))

      } else if(pass === conpass){
        setCheckValid(prev => (
          {...prev, validConPass: true}
        ))
      }
    }


    //  use Effects
    useEffect(() =>{
      encryptPass()
    }, [encPass.basePass])

    useEffect(() =>{
      valid(encPass.basePass, signUpData.conPass);

    }, [encPass.basePass, signUpData.conPass])

  // UI
  return( 
    <div id="this">
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
        {
        checkValid.validEmail && <p>{errMsgs.userEmail[0]}</p>
        }


        <div>
          <input type="password" id="userPass" placeholder="Enter Password" value={encPass.basePass} 
              onChange={e => handleInput(e)}
            />
        </div>

        <div>
          <input type="password" id="conPass" placeholder="Confirm Password" value={signUpData.conPass} 
              onChange={e => handleInput(e)}
            />
        </div>
        {
          !checkValid.validConPass && <p>{errMsgs.userconPass}</p>
        }

        <button disabled={!checkValid.validConPass || dsbBtn} onClick={e => handleBtn(e)}>
          Signup
        </button>

      </form>

    </section>

    <section id="login_second_sec">

    </section>

    </main>
    </div>

  )

}

export default Signup