import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import CardList from '../CardList/CardList';
import { getBookings } from '../../actions/index';
import './Bookings.scss';

const Bookings = () => {
	const [booking, setBooking] = useState();
	let history = useHistory();
	let dispatch = useDispatch();
	const bookings = useSelector((state) => state.bookings);

	useEffect(() => {
		// getBookings();
		dispatch(getBookings());
		console.log('rendered man');
	}, []);

	// const getBookings = async () => {
	//   try {
	//     const bookings = await axios.get('/api/v1/booking/my-tours');
	//     console.log(bookings)
	//     setBooking(bookings.data);
	//     localStorage.setItem('numberOfBookings', bookings.data.tours.length)
	//   } catch (err) {
	//     console.log(err.response)
	//   }
	// };

	const handleClick = (slug) => {
		history.push(`/tour/${slug.slug}`);
	};

	// return !booking ? <h3>loading</h3> : <CardList slug={history} data={bookings} />
	return !bookings.length > 0 ? (
		<div style={{ height: '100vh' }}>
			<h3 className='no-tour-title'>you didn't book any tour yet 😢</h3>
		</div>
	) : (
		<CardList slug={history} data={bookings} />
	);
};

export default Bookings;
