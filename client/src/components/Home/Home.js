import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getUser, getTours } from '../../actions/index';
import Card from '../Card/Card';
import CardList from '../CardList/CardList';

const Home = () => {
  const dispatch = useDispatch();
  const tours = useSelector(state => state.tours)
  let slug = useHistory();


  useEffect(() => {
    dispatch(getTours());
  }, []);


  // useEffect(() => {
  //   tours.tours.length > 0 && localStorage.setItem('numberOfTours', tours.tours.length)
  // }, [tours])

  return (

    <CardList slug={slug} data={tours} />

  );
};

export default Home;
