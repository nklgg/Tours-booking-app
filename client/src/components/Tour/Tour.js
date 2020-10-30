import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUser } from '../../actions/index';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { AiOutlineStock } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { AiOutlineStar } from 'react-icons/ai';
import MapBox from '../../utils/MapBox/MapBox';
import axios from 'axios';
import styled from 'styled-components';
import './Tour.scss';
import ReviewsCarousel from '../ReviewsCarousel/ReviewsCarousel';
import Stripe from '../Stripe/Stripe';
import Review from '../Review/Review';
import BookTourNowButton from '../BookTourNowButton/BookTourNowButton';

const Tour = () => {
	let { slug } = useParams();
	let dispatch = useDispatch();
	let auth = useSelector((state) => state.auth);
	let [tour, setTour] = useState();

	console.log("TOUR CALLEDDDDD")

	useEffect(() => {
		getTour();
	}, []);

	const getTour = async () => {
		const res = await axios.get(`/api/v1/tours/getTourBySlug/${slug}`);
		console.log(res);
		setTour(res.data.data.tour[0]);
	};

	const renderButton = () => {
		let booking;
		if(auth.user.bookings) {

			booking = auth.user.bookings.find((el) => el.tour === tour.id);
		} 

		console.log(booking);

		if (!booking) {
			return (
				<BookTourNowButton
					title={'please login to book the tour!'}
					tour={tour}
				/>
			);
		} else {
			const rev = tour.reviews.find((el) => el.user.id === auth.user._id);

			if (!rev) {
				return <Review tourId={tour.id} />;
			} else {
				return <div>review already exists</div>;
			}
		}
	};

	return !tour ? (
		<div>loading...</div>
	) : (
			<>
				<Section img={`/uploads/tours/${tour.imageCover}`} className='tour'>
					<div className='tour__info'>
						<h1 className='tour__header'>{tour.name} tour</h1>
						<span>{tour.duration} days</span>
						<span>{tour.startLocation.description}</span>
					</div>
				</Section>

				<div className='summary'>
					<div className='summary__facts'>
						<div className='summary__wrapper'>
							<div className='summary__facts-upper'>
								<h2 className='summary__heading'>quick facts</h2>
								<div className='summary__pins'>
									<FaRegCalendarAlt className='summary__pins-svg' />
									<span className='summary__pins-left'>next date</span>
									<span className='summary__pins-right'>april 2022</span>
								</div>
								<div className='summary__pins'>
									<AiOutlineStock className='summary__pins-svg' />
									<span className='summary__pins-left'>difficulty: </span>{' '}
									<span className='summary__pins-right'>{tour.difficulty}</span>{' '}
								</div>
								<div className='summary__pins'>
									<BsPerson className='summary__pins-svg' />{' '}
									<span className='summary__pins-left'>participants</span>{' '}
									<span className='summary__pins-right'>
										{tour.maxGroupSize} people
								</span>
								</div>
								<div className='summary__pins'>
									<AiOutlineStar className='summary__pins-svg' />{' '}
									<span className='summary__pins-left'>rating</span>{' '}
									<span className='summary__pins-right'>
										{tour.ratingsAverage}/5
								</span>
								</div>
							</div>
							<div className='summary__facts-lower'>
								<h2 className='summary__heading'>your tour guides</h2>
								{tour.guides.map((el) => (
									<div className='summary__facts-lower--container'>
										<img
											className='summary__facts-lower--img'
											src={`/uploads/users/${el.photo}`}
											alt=''
										/>
										<span className='summary__pins-left'>lead guide</span>{' '}
										<span className='summary__pins-right'>{el.name}</span>
									</div>
								))}

								<div></div>
							</div>
						</div>
					</div>
					<div className='summary__about'>
						<h2 className='summary__heading'>about the {tour.name} tour</h2>
						<p>
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
							pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit,
							sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
							officia deserunt mollit anim id est laborum.
					</p>
						<p style={{ marginTop: '2rem' }}>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
							delectus fuga enim distinctio eos provident voluptatem quae
							explicabo repellendus magnam quasi expedita voluptatum, ab culpa
							recusandae natus ratione nihil deserunt!
					</p>
					</div>
				</div>

				<section className='images__section'>
					{tour.images.map((el) => (
						<div className='images__box'>
							<img
								className='images__image'
								src={`/uploads/tours/${el}`}
								alt=''
							/>
						</div>
					))}
				</section>

				<section className='mapbox__container'>
					<MapBox locations={tour.locations} startLocation={tour.startLocation} />
				</section>

				{tour.reviews.length > 0 && (
					<section className='reviews'>{<ReviewsCarousel tour={tour} />}</section>
				)}
				{auth.authenticated && renderButton()}
			</>
		);
};

const Section = styled.section`
	background-image: linear-gradient(
			to right bottom,
			rgba(0, 157, 255, 0.6),
			rgba(0, 14, 82, 0.6)
		),
		url(${(props) => props.img});
	color: transparent;
	background-size: cover;
	background-position: top;

	clip-path: polygon(0 0, 100% 0, 100% calc(100% - 11rem), 0 100%);
	height: 85vh;


	@media all and (max-width: 768px) {
		height: 60vh;
}
`;

export default Tour;
