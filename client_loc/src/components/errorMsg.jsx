import React from "react";

const ErrorMsg = (props) => {



  //
  return (
    <main id="err_main_cont" style={styles.main}>
        <h3 style={styles.x}>X</h3>
        <p style={styles.p}>{props.msg}</p>
        <div style={styles.div}></div>
    </main>
  )
}

export default ErrorMsg

const styles = {
    main: {
        width: '100%', display: 'flex', flexDirection: 'column' , gap: '1%', borderRadius: '0.3rem',
        height: '6vh', backgroundColor: 'rgb(201, 51, 31)', color: 'white', justifyContent: 'center', alignItems: 'center'
    },
    x: {
        alignItems: 'center',
        marginTop: '-3%', marginLeft: '85%', color: 'black', display: 'flex', 
    },
    p: { 
        height: '20%', display: 'flex', alignItems: 'center', 
    },
    div: {
        height: '1%', 
        width: '90%', marginTop: '6%' ,
        border: '1px solid black', 
    }

}