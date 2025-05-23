import React, { useState, useContext, useRef, useEffect } from "react";
import {places} from '../assets/locs2'
import { userContext } from "../context/userContext";
import { updUserInfo } from "../utils/userUtils";

const Search = (props) =>{
  let [searchIts, setSearchIts] = useState([])
  const inputRef = useRef(null)

  // Variables
  const {reGetUData, userId } = useContext(userContext)

  const [searchValue, setSearchValue] = useState('')

  const searchFunc = (e) => {

    let megaArr = [...places.lodges, ...places.PermSite, ...places.TempSite, ...places.admin]

    let arr = []
    let {value} = e.target
    let values = value.toLowerCase()

    let s = megaArr.filter( its => {return String(its.name).toLocaleLowerCase().includes(value)})
    let s1 = s.splice(0, 5)

    setSearchIts(s1)
  }

  const handleSearch = (e) => {
    
      let obj = {
      name: 'history',
      data: {
        ...e
      }
    } 
    console.log(obj)

    props.handleClick(e)
    updUserInfo(userId, obj).then(
      resp => reGetUData()
    )
  }

  // STyles
  const style = {
    position: 'absolute', zIndex: '1', height: 'fit-content',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', 

    input: {
        height: '6vh', width: '100%', borderRaduis: '8%',
        border: '1px solid black', fontSize: '25px',
        textAlign: 'center', borderRadius: '10px', 
        backgroundColor: 'white',marginTop: '3px'
    },

    div: {
      height: '85%', width: '96%', gap: '0.5%',
      display: 'flex', flexDirection: 'column', marginTop: '1%',
      backgroundColor: 'transparent', alignItems: 'center'
    },

    here: {
      height: '19%', width: '97%' ,border: '1px solid white', display: 'flex',
      justifyContent: 'center', alignItems: 'center', color: 'white',
      borderRadius: '5%'
    },
    
    hereP: {
      fontSize: '20px', width: '100%', height: '65px', display: 'flex',
      justifyContent: 'center', alignItems: 'center', textAlign: 'center'
    }
  }

  //  Appends
  let append = searchIts.map(its => {
    return <div onClick={e => handleSearch(its)} className="searchP" style={style.here}>
        <p style={style.hereP}>{its.name}</p>
    </div>
  })

  useEffect(() => {
    inputRef.current.focus()
  })
  // UI
  return (
    
    <main style={style} id="search_main_cont">

        <input ref={inputRef} onChange={
            e => searchFunc(e)
        } style={style.input} placeholder="input location"/>

        <div style={style.div}> 
          {append}
        </div>

    </main>

  )
}

export default Search