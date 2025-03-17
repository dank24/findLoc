import React, { useState } from "react";

const Search = () =>{

  // Variables
  const [searchValue, setSearchValue] = useState('')

  const searchFunc = (e) => {
    console.log(e.target.value)
  }


  const style = {
    position: 'absolute',
    zIndex: '1',
    height: '50%',
    width:'45%',
    right: '4px',

    input: {
        height: '15%',
        width: '100%',
        borderRaduis: '8%',
        border: '1px solid black',
        fontSize: '20px',
        textAlign: 'center'
    }
  }

  // UI
  return (
    
    <main style={style} id="search_main_cont">

        <input onChange={
            e => searchFunc(e)
        } style={style.input} placeholder="Input Location"/>

    </main>

  )
}

export default Search