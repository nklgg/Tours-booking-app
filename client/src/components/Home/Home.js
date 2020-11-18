import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getTours } from '../../actions/index';
import CardList from '../CardList/CardList';

const Home = () => {
	const dispatch = useDispatch();
	const tours = useSelector((state) => state.tours);
	let slug = useHistory();

	useEffect(() => {
		dispatch(getTours());
	}, []);

	return <CardList slug={slug} data={tours} />;
};

export default Home;
