import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Spinner = () => {
	return (
		<Loader
			className='spinner'
			type='Oval'
			color='white'
			height={30}
			width={30}
			timeout={30000000} //3 secs
		/>
	);
};

export default Spinner;
