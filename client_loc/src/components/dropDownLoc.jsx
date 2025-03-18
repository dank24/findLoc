import React from 'react'

const DropDownCard = () => {

  //Variables


  let style = {
    position: 'absolute',
    width: '90%',
    height: '70%',
    backgroundColor: 'gold',
    zIndex: '1',
    top: '10%',
    left: '5%',
    border: '1px solid white',
    borderRadius: '4%'
  }

  // UI
  return (
    <main style={style} id='dropdown_card_main'>

      <section id='dropdownCard_first_sec'>
        <div id='1sec_1div'>
            <h3>Temp Site</h3>
        </div>

        <div id='1sec_2div'>
            <h3>Perm Site</h3>
        </div>
      </section>

      <section id='dropdownCard_second_sec'>

      </section>

    </main>
  )
}

export default DropDownCard
