import React from 'react';
import './Hamburger.css';

const Hamburger = ({ handleHamburgerClick, clicked }) => {
	return (
		<div
			onClick={() => handleHamburgerClick()}
			className={`btn ${!clicked ? 'not-active' : 'active'}`}>
			<span className='hamburger__span'></span>
			<span className='hamburger__span'></span>
			<span className='hamburger__span'></span>
		</div>
	);
};

export default Hamburger;
