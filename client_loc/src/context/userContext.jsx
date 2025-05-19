import React, { use, useEffect, useState } from "react";
import { createContext, } from "react";

import { getUserdata } from "../utils/userUtils";

export const userContext = createContext()

function UserContextProvider({children}) {
  // Variables
  const userId = localStorage.getItem('id')

  const [reCheck, setReCheck] = useState(false)
  const [userData2, setUserData] = useState({
    userHistory: []
  })

  // functions

  const reGetUData = async () => {
    let s = await getUserdata(userId)
    setUserData(s.data.data)
  }

  console.log(userData2)
  
  //  useEffect
  useEffect(() =>{
    reGetUData()
  }, [])
  //
  return (
    <userContext.Provider value={{userData2, reGetUData}}>
        {children}
    </userContext.Provider>
  )
}

export default UserContextProvider