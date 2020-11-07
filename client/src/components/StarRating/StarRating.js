import React from 'react'
import ReactStars from "react-rating-stars-component";


const StarRating = ({ setRating, value }) => {

  const ratingChanged = (newRating) => {
    setRating(newRating)
  };


  return (
    <ReactStars
      value={value}
      count={5}
      onChange={ratingChanged}
      size={24}
      isHalf={false}
      // emptyIcon={<i className="far fa-star"></i>}
      // fullIcon={<i className="fa fa-star"></i>}
      activeColor="#ffd700"
    />
  )
}

export default StarRating
