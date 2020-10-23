import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const ReviewsCarousel = ({ tour }) => {
	const handleOnDragStart = (e) => e.preventDefault();

	const items = tour.reviews.map((el) => (
		<div className='reviews__box'>
			<div className='reviews__image-container'>
				<img src={`/uploads/users/${el.user.photo}`} alt='' />
			</div>
			<div className='reviews__info'>
				<h6 className='reviews__name'>{el.user.name}</h6>
				<p className='reviews__review'>{el.review}</p>
			</div>
		</div>
	));

	console.log(tour);
	return (
		<AliceCarousel
			items={items}
			fadeOutAnimation={true}
			mouseTrackingEnabled={true}
			buttonsDisabled={true}
			responsive={{
				0: { items: 1 },
				768: { items: 2 },
				1400: { items: 3 },
				1800: { items: 3 },
			}}
		/>
	);
};

export default ReviewsCarousel;
