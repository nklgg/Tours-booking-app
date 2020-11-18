import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardList from '../CardList/CardList';
import { getBookings } from '../../actions/index';
import './Bookings.scss';

const Bookings = () => {
	let history = useHistory();
	let dispatch = useDispatch();
	const bookings = useSelector((state) => state.bookings);

	useEffect(() => {
		dispatch(getBookings());
		console.log('rendered man');
	}, []);

	return !bookings.tours.length > 0 ? (
		<div style={{ height: '100vh' }}>
			<h3 className='no-tour-title'>you didn't book any tour yet 😢</h3>
		</div>
	) : (
		<CardList slug={history} data={bookings} />
	);
};

export default Bookings;
