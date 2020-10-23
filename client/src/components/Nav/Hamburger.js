import React, {useState} from 'react'
import './Hamburger.css'

const Hamburger = ({handleHamburgerClick, clicked}) => {
  // const [clicked, setClicked] = useState(false);



  return (



  <div onClick={() => handleHamburgerClick()}  class={`btn ${!clicked ? 'not-active' : 'active'}`}>
    <span className="hamburger__span"></span>
    <span className="hamburger__span"></span>
    <span className="hamburger__span"></span>
  </div>
  )
}

export default Hamburger
