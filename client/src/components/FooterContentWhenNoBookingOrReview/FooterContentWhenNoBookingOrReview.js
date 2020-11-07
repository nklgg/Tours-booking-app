import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ButtonWithSpinner from '../../utils/ButtonWithSpinner/ButtonWithSpinner';
import Stripe from '../Stripe/Stripe';
import './FooterContentWhenNoBookingOrReview.scss';

const FooterContentWhenNoBookingOrReview = ({ title, tour, authenticated }) => {
	const [clicked, setClicked] = useState(false);
	let history = useHistory();

	const handleClick = (e) => {
		e.preventDefault();

		setClicked(true);
		history.push('/signin');
	};

	return (
		<section className='booktour__section'>
			<div className='booktour'>
				<div className='img__container'>
					{tour.images.map((el) => (
						<img
							className='booktour__img'
							src={`/uploads/tours/${el}`}
							alt=''
						/>
					))}
				</div>

				<div className='booktour__info'>
					<h3 className='booktour__title-heading'>what are you waiting for?</h3>
					<p className='booktour__title-description'>
						{tour.duration} days. 1 adventure. Infinite memories. Make it yours
						today!
					</p>
				</div>
				{!authenticated ? (
					<div style={{ marginLeft: 'auto' }} onClick={(e) => handleClick(e)}>
						<ButtonWithSpinner clicked={clicked} title={title} />
					</div>
				) : (
					<Stripe title={title} tourId={tour.id} />
				)}
			</div>
		</section>
	);
};

export default FooterContentWhenNoBookingOrReview;
