import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Card.scss';
import MyLoader from '../../utils/MyLoader/MyLoader'
import { FaMoneyBill } from 'react-icons/fa';
import { GoLocation } from 'react-icons/go'
import { RiCalendarEventLine } from 'react-icons/ri'
import JumpingButton from '../JumpingButton/JumpingButton';


const Card = ({ data }) => {
  // const tours = useSelector((state) => state.tours);
  const [loaded, setLoaded] = useState(false);
  console.log('ovo je data:', data);
  let history = useHistory();
  // console.log(tours);

  const handleClick = (slug) => {
    history.push(`/tour/${slug.slug}`);
  }

  const printDate = (data) => {
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(data.startDates[0]));
    const year = new Date(data.startDates[0]).getFullYear();

    return `${month}, ${year}`

  };

  return (




    !data ? <MyLoader /> : <div onClick={() => handleClick(data)} className="card">
      {/* <button className="card__reserve-button"> reserve </button>{' '} */}
      {/* <ContentLoader /> */}
      <JumpingButton className="card__reserve-button" />
      <div className="card__img-container">
        <img
          onLoad={() => setLoaded(true)}
          src={`uploads/tours/${data.imageCover}`}
          alt=""
          className="card__img"
        />
      </div>{' '}
      <div className="card__footer">
        {/* <div className="card__footer-visible"> */}
        <h3 className="card__title"> {data.name} </h3>
        {/* <p className="card__difficulty">
                {el.difficulty} {el.duration} - day tour
              </p> */}
        <p className="card__summary"> {data.summary} </p>
        {/* </div> */}
        {/* <div className="card__footer-invisible"> */}
        <div className="card__info">
          <div className="card__info-price">
            <FaMoneyBill className="card__info-svg" />
            <span className="card__info-price--span">

              starting from ${data.price}
            </span>
          </div>

          <div className="card__footer-invisible">

            <div className="card__details-button">
              <GoLocation />
              <p>{data.startLocation.description}</p>
            </div>
            <div className="card__details-button">
              <RiCalendarEventLine />
              <p>{printDate(data)}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );


};

export default Card;
