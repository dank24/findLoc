import React, { useState } from "react";
import Search from "./search";

const ProfileMenu = (props) =>{
  
  // Variables
  const [uiDisplay, setUiDisplay] = useState({
    profile: true,
    Account: false,
    About: false,
  })
  let pArr = ['Account', 'About', 'Saved', 'Logout',]


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
         display: 'flex', alignItems: 'center', flexDirection: 'column'
    },
    h1: {
        border: '1px solid transparent', color: 'grey', height: '32%', width: '98%',
        display: 'flex', alignItems: 'center', borderRadius: '8%'
    },
    accountDiv: {
        zIndex: '1', height: '42%', position: 'absolute', border: '1px solid black',
        width: '42%', left: '57%', top: '6.5%', borderRadius: '5%', 
        backgroundColor: 'grey', color: 'white', display: 'flex', justifyContent: 'center',
        alignItems: 'center', flexDirection: 'column', gap: '5%',
        div: {
          width: '80%', display: 'flex', gap: '5%'
        },
    },
    aboutDiv: {

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
        <main className="cards" style={style.main}>
            {appendMain}
        </main>
    }
  

    {  uiDisplay.Account &&
        <div style={style.accountDiv}>
          <div style={style.accountDiv.div}>
            <h3>Username:</h3>
            <h4>{props.userName}</h4>
          </div>

          <div style={style.accountDiv.div}>
            <h3>Email:</h3>
            <h4>{props.userEmail}</h4>
          </div>

          <div style={style.accountDiv.div}>
            <button className="contact-btn">Change Email</button>
            <button className="contact-btn">Change Password</button>
          </div>
        </div>
    }

    {  uiDisplay.About &&
       <div className="container">
          <h1>About University Navigator</h1>
          <p>University Navigator is a dedicated platform designed to simplify and enhance the campus experience for students, faculty, and visitors. We understand that navigating a large university can be challenging, especially for newcomers. Our mission is to provide an intuitive and efficient tool that makes it easy to find locations, services, and resources within the university.</p>

          <h2>Our Mission</h2>
          <p>We aim to create a seamless and accessible navigation experience, empowering users to explore their campus with confidence. By leveraging cutting-edge technology and user-centric design, we strive to make university life more convenient and enjoyable.</p>

          <h2>What We Offer</h2>
          <p>University Navigator offers a range of features, including:</p>
          <ul>
              <li>Interactive campus maps with detailed building information</li>
              <li>Real-time navigation and route planning</li>
              <li>Searchable directory of departments, facilities, and services</li>
          </ul>

          <h2>Our Team</h2>
          <p>We are a team of passionate developers, designers, and university enthusiasts committed to improving campus navigation. Our diverse backgrounds and expertise allow us to create a platform that meets the unique needs of our users.</p>

          <a href="/contact" className="contact-btn">Contact Us</a>
      </div>

    }
    </>
   
    
  )
}

export default ProfileMenu