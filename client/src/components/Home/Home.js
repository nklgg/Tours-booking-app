import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getTours } from '../../actions/index';
import Card from '../Card/Card';
import CardTest from '../CardTest/CardTest';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getUser());
  }, []);

  useEffect(() => {
    dispatch(getTours());
    console.log('GET TOURS ACTIVATED MAN');
  }, []);

  return (
    <div>
      <Card />
      {/* <CardTest /> */}
    </div>
  );
};

export default Home;
