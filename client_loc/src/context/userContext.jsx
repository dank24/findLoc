import React, { useEffect, useState } from "react";
import { createContext, } from "react";

import { getUserdata } from "../utils/userUtils";
import ErrorMsg from "../components/errorMsg";

export const userContext = createContext()

function UserContextProvider({children}) {
  // Variables
  const userId = localStorage.getItem('id')

  const [reCheck, setReCheck] = useState(false)

  let [errors, setErrors] = useState([])
  let [reE, setRee] = useState({
    status: 'off',
    set: false
  })


  const [userData2, setUserData] = useState({
    userHistory: [],
    savedLocations: []
  })


  let i;

  // functions

  const reGetUData = async () => {
    let s = await getUserdata(userId)
    
    if(s.status == 'OK'){
        setUserData(prev => (s.data.data))
    }
    
  }
  

  const pushIntoErrors =  (e) => {
    setErrors(prev => ([...prev, e]))

    if(reE.status == 'off'){
      setRee(prev => ({status: 'on', set: !prev.set}))
    }
  }

  const clearErr = () => {

    if(errors.length > 0){
      i = setInterval(() => {
        setErrors(prev => {

          if(prev.length == 0){
            i && clearInterval(i)
            setRee(prev => ({status: 'off'}))
            return []
          } 

          if(prev.length == 1){
            console.log(1)
            setRee(prev => ({status: 'off'}))
            clearInterval(i)
            return []
          } else {
            let arr = prev.slice(1)
            console.log(2)
            console.log(prev.length)
            return arr
          }

        })
      }, 4000);
    }
  
    return () => {
      if(i){
        console.log()
        clearInterval(i)
      }
    }
  }

errors.length > 0 ? console.log('d') : console.log
  
  //  useEffect
  useEffect(() =>{
    reGetUData()
  }, [])

  useEffect(() =>{
   clearErr()
  }, [reE.set])

/*   useEffect(() =>{
    clearErr()clearErr()
  }, [push]) */
  //


  const styles ={ zIndex: '1',
    height: 'fit-content', display: errors.length > 0 ? 'flex': 'none', flexDirection: 'column', width: '25vw',
    gap: '10px', border: '2px solid brown', position: 'absolute', left: '1px'
  }
  return (
    <>
      <section  style={styles}>
      {
        errors.length > 0 && errors.map(it => {
          return < ErrorMsg 
              msg = {it}
          />

        })
      }
      </section>

      
      <userContext.Provider value={{userData2, reGetUData, setErrors, clearErr, pushIntoErrors, errors}}>
          {children}
      </userContext.Provider>

    </>
    
  )
}

export default UserContextProvider


