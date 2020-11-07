import React from 'react';
import Stripe from '../Stripe/Stripe';
import './BookTourNowButton.scss';

const BookTourNowButton = ({ tour, title }) => {
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

				{/* <button className='booktour__title-button'>book tour now!</button> */}
				{!title ? <Stripe tourId={tour.id} className='booktour__title-button' /> : <button>{title}</button>}
				{/* <StripeButton className='booktour__title-button' /> */}
			</div>
		</section>
	);
};

export default BookTourNowButton;
