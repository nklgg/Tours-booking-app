import React from 'react'
import ReactStars from "react-rating-stars-component";


const StarRating = ({setRating}) => {

  const ratingChanged = (newRating) => {
    setRating(newRating)
  };


  return (
    <ReactStars
    count={5}
    onChange={ratingChanged}
    size={24}
    isHalf={false}
    emptyIcon={<i className="far fa-star"></i>}
    fullIcon={<i className="fa fa-star"></i>}
    activeColor="#ffd700"
  />
  )
}

export default StarRating
