import React, { use, useEffect, useState } from "react";
import { createContext, } from "react";

import { getUserdata } from "../utils/userUtils";
import ErrorMsg from "../components/errorMsg";

export const userContext = createContext()

function UserContextProvider({children}) {
  // Variables
  const userId = localStorage.getItem('id')

  const [reCheck, setReCheck] = useState(false)

  let [errors, setErrors] = useState(['d'])
  let [reE, setRee] = useState(true)


  const [userData2, setUserData] = useState({
    userHistory: []
  })

  let t = [...errors]

  // functions

  const reGetUData = async () => {
    let s = await getUserdata(userId)
    
    if(s.status == 'OK'){
        setUserData(s.data.data)
    }
    
  }

  const pushIntoErrors =  (e) => {
    let arr = [...errors];

    arr.push(e)
    setErrors(prev => ([...arr]))
    setRee(prev => (!reE))
  }

  const clearErr = () => {
    let arr = [...errors]
    let i = setInterval(() => {

      if(arr.length > 0){
        arr.shift()
        setErrors(prev => ([...arr]))  
        console.log('shifted')
      } else {
        clearInterval(i);
        console.log('cleared')
      }

    }, 4000);
  }


  //  Append
  let appendErros =
    <section style={styles}>
      { 
      errors.map(its => 
        < ErrorMsg msg = {its} />
      )}
    </section>
  
   
  


  console.log(errors)
  
  //  useEffect
  useEffect(() =>{
    reGetUData()
  }, [])

  useEffect(() =>{
   clearErr()
  }, [reE])

/*   useEffect(() =>{
    clearErr()clearErr()
  }, [push]) */
  //
  return (
    <>
      <section style={styles}>
      {
        t.map(it => {
          return < ErrorMsg 
              msg = {it}
          />

        })
      }
      </section>

      
      <userContext.Provider value={{userData2, reGetUData, setErrors, push: pushIntoErrors, errors}}>
          {children}
      </userContext.Provider>

    </>
    
  )
}

export default UserContextProvider


const styles ={
  height: 'fit-content', display: 'flex', flexDirection: 'column', width: '25vw',
  gap: '10px', border: '2px solid brown', position: 'absolute', left: '1px'
}