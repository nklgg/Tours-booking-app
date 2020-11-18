import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import StarRating from '../StarRating/StarRating';
import './ReviewsCarousel.scss';
import { FaStar } from 'react-icons/fa';
import _ from 'lodash';

const ReviewsCarousel = ({ tour }) => {
	console.log(tour);

	const handleOnDragStart = (e) => e.preventDefault();

	const items = tour.reviews.map((el) => (
		<div className='reviews__box'>
			<div className='reviews__image-container'>
				<img src={`/uploads/users/${el.user.photo}`} alt='' />
			</div>
			<div className='reviews__info'>
				<h6 className='reviews__name'>{el.user.name}</h6>
				<p className='reviews__review'>{el.review}</p>
				<div className='reviews__star-wrapper'>
					<StarRating value={el.rating} />
				</div>
				{/* {_.times(el.rating, (i) => <FaStar color='#ffd700' />)} */}
			</div>
		</div>
	));

	return (
		<AliceCarousel
			items={items}
			fadeOutAnimation={true}
			mouseTrackingEnabled={true}
			buttonsDisabled={true}
			responsive={{
				0: { items: 1 },
				980: { items: 2 },
				1400: { items: 3 },
				1800: { items: 3 },
			}}
		/>
	);
};

export default ReviewsCarousel;
