import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Card.scss';
import { BiMap } from 'react-icons/bi';
import { BiCalendar } from 'react-icons/bi';
import { BiFlag } from 'react-icons/bi';
import { BiUser } from 'react-icons/bi';
import JumpingButton from '../JumpingButton/JumpingButton';

const Card = () => {
  const tours = useSelector((state) => state.tours.tours);
  console.log(tours);

  return (
    <div className="card-container">
      {tours.map((el) => {
        return (
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
                  <Link to={`/tour/${el.slug}`}>
                  <button className="card__details-button">
                     details 
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
