import React from "react";
import { useState } from "react";

import hamburgIcon from '../assets/images/icons/hamburgerIcon.svg'
import historyIcon from '../assets/images/icons/historyIcon.svg'
import searchIcon from '../assets/images/icons/searchIcon.svg'
import mapIconDef from '../assets/images/icons/mapIconDef.svg'

const PhoneUi = () => {

    // variables
    const [uiDisplay, setUiDisplay] = useState({
        hamburgerMenu: false,
        searchInput: false,
        places: false,
        history: false
    })

    //  Functions
    const btnClick = (e) =>{
        let {id} = e.target 
        setUiDisplay(prev => (
            {...prev, [id]: !uiDisplay[id]}
        ))

        console.log(uiDisplay)
    }


    let style = {
        main: {
            height: '100%', width: '100%',
            backgroundColor: 'red'
        },
        hamburgScreen: {border: '2px solid red', position: 'absolute', 
            height:'80%', width: '80%', zIndex: 1, 
            bottom: '1%', right: '2%'
        }
    }

    //  Ui
    return (
        <main style={style.main}>


            {   uiDisplay.hamburgerMenu &&
                <div style={style.hamburgScreen}>sths</div>
            }


            <div id="phone_nav_div" >
                <div>
                    <img onClick={btnClick} id="history" src={historyIcon} />
                </div>

                <div>
                    <img onClick={btnClick} id="places" src={mapIconDef} />
                </div>
                <div>
                    <img onClick={btnClick} id="searchInput" src={searchIcon} />
                 </div>
                <div>
                    <img onClick={btnClick} id="hamburgerMenu" src={hamburgIcon} />
                </div>
            </div>
        </main>
    )
}

export default PhoneUi