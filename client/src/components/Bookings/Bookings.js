import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BiMap } from 'react-icons/bi';
import { BiCalendar } from 'react-icons/bi';
import { BiFlag } from 'react-icons/bi';
import { BiUser } from 'react-icons/bi';
import JumpingButton from '../JumpingButton/JumpingButton';
import { Link } from 'react-router-dom';
import Review from '../Review/Review';
import './Bookings.scss';

const Bookings = () => {
  const [booking, setBooking] = useState();

  useEffect(() => {
    getBookings();
  });

  const getBookings = async () => {
    const bookings = await axios.get('/api/v1/booking/my-tours');
    setBooking(bookings.data.tours);
  };
  return (
    <div className="card-container">
      {!booking ? (
        <div>loading...</div>
      ) : (
        booking.map((el) => (
          <div className="card">
            {/* <button className="card__reserve-button"> reserve </button>{' '} */}
            <JumpingButton className="card__reserve-button" />
            <div className="card__img-container">
              <img
                src={`uploads/tours/${el.imageCover}`}
                alt=""
                className="card__img"
              />
            </div>{' '}
            <div className="card__footer">
              <div className="card__footer-visible">
                <h3 className="card__title"> {el.name} </h3>
                <p className="card__difficulty">
                  {el.difficulty} {el.duration} - day tour
                </p>
                <p className="card__summary"> {el.summary} </p>
              </div>
              <div className="card__footer-invisible">
                <div className="card__info">
                  <div className="card__info-pins">
                    <div className="card__info-pins--icon">
                      <BiMap /> <span> {el.startLocation.description} </span>
                    </div>
                    <div className="card__info-pins--icon">
                      <BiCalendar /> <span> June 2020 </span>
                    </div>
                    <div className="card__info-pins--icon">
                      <BiFlag />
                      <span>
                        {el.locations.length}
                        stops
                      </span>
                    </div>
                    <div className="card__info-pins--icon">
                      <BiUser />
                      <span>
                        {el.maxGroupSize}
                        people
                      </span>
                    </div>
                  </div>
                  <button className="card__details-button">
                    <Link to={`/tour/${el.slug}`}> details </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Bookings;
