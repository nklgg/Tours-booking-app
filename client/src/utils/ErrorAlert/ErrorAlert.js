import React from 'react';
import './ErrorAlert.scss';

const ErrorAlert = ({ message }) => {
	return (
		<div className='alert'>
			<span>Error: </span>
			<span>{message}</span>
		</div>
	);
};

export default ErrorAlert;
