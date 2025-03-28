import React, { useState } from "react";
import {places} from '../assets/locs'

const Search = (props) =>{
  let [searchIts, setSearchIts] = useState([])

  // Variables
  const [searchValue, setSearchValue] = useState('')

  const searchFunc = (e) => {

    let megaArr = [...places.lodges, ...places.PermSite, ...places.TempSite]

    let arr = []
    let {value} = e.target
    let values = value.toLowerCase()

    let s = megaArr.filter( its => {return String(its.name).toLocaleLowerCase().includes(value)})
    let s1 = s.splice(0, 5)

    setSearchIts(s1)

    console.log(s1)
    console.log(s)
  }

  // STyles
  const style = {
    position: 'absolute', zIndex: '1', height: '50%',
    width:'35%', right: '4px', display: 'flex', flexDirection: 'column',
    alignItems: 'center', 

    input: {
        height: '13%', width: '100%', borderRaduis: '8%',
        border: '1px solid black', fontSize: '20px',
        textAlign: 'center', borderRadius: '10px', 
        backgroundColor: 'white'
    },

    div: {
      border: '1px solid red', height: '85%', width: '96%', gap: '1%',
      display: 'flex', flexDirection: 'column', marginTop: '1%',
      backgroundColor: 'rgb(63, 59, 59)', alignItems: 'center'
    },

    here: {
      height: '19%', width: '97%' ,border: '1px solid white', display: 'flex',
      justifyContent: 'center', alignItems: 'center', color: 'white'
    },
    
    hereP: {
      fontSize: '20px', width: '100%', height: '70%', display: 'flex',
      justifyContent: 'center', alignItems: 'center', textAlign: 'center'
    }
  }

  //  Appends
  let append = searchIts.map(its => {
    return <div onClick={e => props.handleClick(its)} className="searchP" style={style.here}>
        <p style={style.hereP}>{its.name}</p>
    </div>
  })

  // UI
  return (
    
    <main style={style} id="search_main_cont">

        <input onChange={
            e => searchFunc(e)
        } style={style.input} placeholder="input location"/>

        <div style={style.div}> 
          {append}
        </div>

    </main>

  )
}

export default Search