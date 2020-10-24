import React from 'react';
import './CardTest.scss';
import styled from 'styled-components';

const CardTest = () => {
  return (
    <div className="card">
      <div className="card__heading">
        <div className="card__author">
          <img src='' alt="" className="card__author-img" />
          <h3 className="card__author-name">THE SEA EXPLORER</h3>
          <p className="card__author-info">MEDIUM 7-DAY TOUR</p>
        </div>
      </div>

      <div className="card__description">
        <h3>hover me</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum illum, debitis itaque ex odit commodi eius natus doloribus nostrum animi officia repudiandae consequatur beatae officiis non 
        </p>
      </div>
    </div>

  )
}



export default CardTest;
