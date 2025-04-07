import React, { useState } from "react";

const AdminDash = () => {

  // Variables
    let [displayScreen, setDisplaySccreen] = useState({
        Overview: true,
        'Add Locations': false
    })

  // Functions
  function sidebar(e) {
    let obj = {Overview: false, 'Add Locations': false}
    let {id } = e.target
    setDisplaySccreen({...obj, [id]: true})
  }
  console.log(displayScreen)


  // Appends
  let arr = ['Overview', 'Add Locations']
  let appendSide = arr.map(its => (
    <h3 onClick={e => sidebar(e)} key={its} id={its}>{its}</h3>
  ))

  let arr2 = ['Type', 'Name', 'lat/lng', 'image',]
  let appendLocations = arr2.map(its => (
        <button style={style.div.button}>{its}</button>
  ))

  arr2.pop()
  let appendConfirm = arr2.map(its => (
    <p style={style.p} key={its}>{its}: <b style={style.b}></b></p>
  ))
  
  // UI
  return(
    <main id="admin_main_cont">

        <section id="admin_first_sec">
            <div id="sec1_div1">
    
            </div>

            <div id="sec1_div2">
                { appendSide }
            </div>

        </section>

        <section id="admin_second_sec">
            {
                displayScreen['Add Locations'] &&
                <div id="sec2_div1">

                    <div style={style}>
                        <div style={style.div}>
                           {appendLocations}
                        </div>

                        <div style={{width: '70%', height: '100%'}}>
                            <input style={style.div.input} placeholder='seleBtn'/>
                            
                            <div style={{marginTop: '1.5%', height: '70%'}}>
                                <button style={style.btn}>sj</button>
                                { appendConfirm }
                            </div>
                        </div>
                    </div>


                </div>
            }
        </section>

    </main>
  )
}

export default AdminDash




let style = {
    color: 'white', border: '1px solid black',
    width: '100%', display: 'flex',
    height: '100%', backgroundColor: 'rgb(133, 151, 255)',

    b: {marginLeft: '3%',display: 'block', marginTop: '1%',
        overflow: 'hidden',width: '100%', height: '75%',},

    p: {
        fontSize: '19px',
        width: '100%', height: '20%',
        textOverflow: 'wrap', display: 'flex', flexDirection: 'column',
        flexWrap: 'nowrap'
    },

    btn: {
        position: 'relative', borderRadius: '1rem',
        left: '70%', width: '23%', height: '29px',
        boxShadow: '2px 2px 2px blue'
    },

    div: {
        width: '30%', border: '2px solid gold', flexDirection: 'column',
        height: '100%', display: 'flex', gap: '1%', alignItems: 'center',

        button: {
            marginLeft: '1%', color: 'white',
            backgroundColor: 'black ',
            width: '90%', 
            height: '10%', borderRadius: '1rem',
        },

        input: {
            height: '15%', position: 'relative', left: '4%',
            width: '90%', marginLeft: '1%', border: '1px solid green',
            borderRadius: '1rem', marginTop: '2%'
        }
    }

}