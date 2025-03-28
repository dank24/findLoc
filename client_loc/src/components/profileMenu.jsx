import React, { useState } from "react";

const ProfileMenu = () =>{
  
  // Variables
  const [uiDisplay, setUiDisplay] = useState({
    profile: true,
    Account: false,
    About: false,
  })
  let pArr = ['Account', 'About', 'Logout',]


  // Functions
  const profileClick = (e) =>{
    let con = e.target.innerHTML

    pArr.map(its =>{
        if(con == its){
            setUiDisplay({profile: false, Account: false, About: false, [its]: true})
        }
    })

  }


  console.log(uiDisplay)

  // Styling
  let style = {
    main: {
        height: '23%', border: '1px solid black', position: 'absolute', gap: '1%', justifyContent: 'center',
        width: '21%', zIndex: '1', right: '1%', borderRadius: '5%', marginTop: '3px',
        backgroundColor: 'brown', display: 'flex', alignItems: 'center', flexDirection: 'column'
    },
    h1: {
        border: '1px solid transparent', color: 'white', height: '32%', width: '98%',
        display: 'flex', alignItems: 'center', borderRadius: '8%'
    },
    accountDiv: {
        zIndex: '1', height: '50%', position: 'absolute', border: '1px solid red',
        width: '70%', left: '17%', top: '20%', borderRadius: '5%', 
        backgroundColor: 'black'
    }
  }

  // Append
  let appendMain = pArr.map(its => {
    return(
        <h2 onClick={e => profileClick(e)} className="dropdown_p" style={style.h1} key={its}>
            {its}
        </h2>
    )
  })

  // UI
  return (
    <>
    { uiDisplay.profile &&
        <main style={style.main}>
            {appendMain}
        </main>
    }
  

    {  uiDisplay.Account &&
        <div style={style.accountDiv}>

        </div>
    }
    </>
   
    
  )
}

export default ProfileMenu