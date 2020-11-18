import React from 'react';
import './JumpingButton.sass';

const JumpingButton = () => {
	return (
		<button
			aria-label='Thanks'
			className='h-button centered card__reserve-button'
			data-text='RESERVE'>
			<span>O</span>
			<span>n</span>
			<span>l</span>
			<span>y</span>
			<span style={{ margin: '0 5px' }}>3</span>
			<span>l</span>
			<span>e</span>
			<span>f</span>
			<span>t</span>
		</button>
	);
};

export default JumpingButton;
