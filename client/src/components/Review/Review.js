import React, { useState } from 'react';
import axios from 'axios';
import StarRating from '../StarRating/StarRating'
import './Review.scss';

const Review = ({ tourId }) => {
  const [review, setReview] = useState();
  const [rating, setRating] = useState();



  const handleChange = (e) => {
    e.target.name === 'review' && setReview(e.target.value);
    e.target.name === 'rating' && setRating(e.target.value);
    console.log(review, rating)

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `/api/v1/tours/${tourId}/reviews`,
        { review, rating },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <div className="review">

    <form className="review__form">

<h3>Thank you for booking this tour! Tell us how was your experience?</h3>





      <label className="review__label" htmlFor="review">Enter your review</label>
      <input className="review__input" onChange={(e) => handleChange(e)} name="review" type="text" />


      <label className="review__label" htmlFor="rating">Please rate your tour!</label>
      <StarRating setRating={setRating} />


      <button onClick={(e) => handleSubmit(e)}>submit review</button>
    </form>
        </div>
  );
};

export default Review;
