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
        width: '25vw', display: 'flex', flexDirection: 'column' , gap: '1%',
        height: '6vh', backgroundColor: 'grey', color: 'white', justifyContent: 'center', alignItems: 'center'
    },
    x: {
        alignItems: 'center',
        marginTop: '-3%', marginLeft: '85%', color: 'red', display: 'flex', 
    },
    p: { 
        height: '40%', display: 'flex', alignItems: 'center', fontSize: '20px'
    },
    div: {
        height: '1%', 
        width: '90%', marginTop: '2%' ,
        border: '1px solid black', 
    }

}