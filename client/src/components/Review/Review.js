import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../../utils/ErrorAlert/ErrorAlert';
import StarRating from '../StarRating/StarRating';
import ButtonWithSpinner from '../../utils/ButtonWithSpinner/ButtonWithSpinner';
import './Review.scss';

const Review = ({ tourId }) => {
	const [review, setReview] = useState();
	const [rating, setRating] = useState();
	const [loading, setLoading] = useState(null);
	const [error, setError] = useState(null);
	const history = useHistory();

	const handleChange = (e) => {
		e.target.name === 'review' && setReview(e.target.value);
		e.target.name === 'rating' && setRating(e.target.value);
		console.log(review, rating);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();


		setLoading(true);
		try {
			const res = await axios.post(
				`/api/v1/tours/${tourId}/reviews`,
				{ review, rating },
				{ withCredentials: true }
			);

			history.go(0);
			setLoading(false)
		} catch (err) {
			setError(err.response);
			console.log(err.response);
			setLoading(false)

		}
	};

	return (
		<div className='review'>
			<form onSubmit={(e) => handleSubmit(e)} className='review__form'>
				<h3>
					Thank you for booking this tour! Tell us how was your experience?
				</h3>

				<label className='review__label' htmlFor='review'>
					Enter your review
				</label>
				<input
					className='review__input'
					onChange={(e) => handleChange(e)}
					name='review'
					type='text'
				/>

				<label className='review__label' htmlFor='rating'>
					Please rate your tour!
				</label>
				<StarRating setRating={setRating} />

				{/* <button className='form__button' onClick={(e) => handleSubmit(e)}>
					submit review
				</button> */}
				<ButtonWithSpinner clicked={loading} title="title" />
			</form>
			{error && <ErrorAlert message={error.data.message} />}
		</div>
	);
};

export default Review;
