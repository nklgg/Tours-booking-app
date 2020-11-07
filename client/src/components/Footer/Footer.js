import React, { useState } from 'react';
import ButtonWithSpinner from '../../utils/ButtonWithSpinner/ButtonWithSpinner';
import BookTourNowButton from '../BookTourNowButton/BookTourNowButton';
import Review from '../Review/Review';
import Stripe from '../Stripe/Stripe';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FooterContentWhenNoBookingOrReview from '../FooterContentWhenNoBookingOrReview/FooterContentWhenNoBookingOrReview';

const Footer = ({ tour, title }) => {
	const [clicked, setClicked] = useState(false);
	let history = useHistory();
	let auth = useSelector((state) => state.auth);

	console.log(clicked);

	const handleClick = () => {
		setClicked(true);
		history.push('/signin');
	};

	const renderButton = () => {
		if (!auth.authenticated) {
			return (
				<FooterContentWhenNoBookingOrReview
					tour={tour}
					authenticated={auth.authenticated}
					title={'login to book tour'}
				/>
			);
		} else {
			const booking = auth.user.bookings.find((el) => el.tour === tour.id);

			if (!booking) {
				// return <Stripe tourId={tour.id} />;
				return (
					<FooterContentWhenNoBookingOrReview
						tour={tour}
						authenticated={auth.authenticated}
						title={'book tour now'}
					/>
				);
			} else {
				// return <h3>leave a review</h3>;
				const reviews = tour.reviews.find((el) => el.user.id === auth.user.id);
				if (!reviews) {
					return <Review tourId={tour.id} />;
				} else {
					return <div />;
				}
			}
		}
	};

	return renderButton();
};

export default Footer;
