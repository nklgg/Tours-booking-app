import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import axios from 'axios';
import Spinner from '../../utils/Loader.js/Spinner';

import './Stripe.scss';

const Stripe = ({ tourId, title }) => {
	const [session, setSession] = useState(false);
	const [clicked, setClicked] = useState(false);

	const stripePromise = loadStripe(
		'pk_test_51HZFHqCF9ZD7Wvnb2eZjfZMqxntTYI7nfkYt4D08yVOerKsAsicql2wHYweF0LdX9CI7YhCbLHr56pQNGVazqCik00qe561EPJ'
	);

	const handleClick = async (event) => {
		setSession(true);
		setClicked(true);
		// Get Stripe.js instance
		const stripe = await stripePromise;

		// Call your backend to create the Checkout Session

		const session = await axios.get(
			`/api/v1/booking/checkout-session/${tourId}`,
			{
				withCredentials: true,
			}
		);

		console.log(session);

		// When the customer clicks on the button, redirect them to Checkout.
		const result = await stripe.redirectToCheckout({
			sessionId: session.data.session.id,
		});

		if (result.error) {
			// If `redirectToCheckout` fails due to a browser or network
			// error, display the localized error message to your customer
			// using `result.error.message`.
		}
	};

	return (
		<StripeButton onClick={handleClick}>
			{title}
			<SpinnerWrapper clicked={clicked}>
				<Spinner />
			</SpinnerWrapper>
		</StripeButton>

		// <button className='stripe-button' onClick={handleClick} role='link'>
		// 	{!session ? 'book tour now!' : 'processing'}
		// </button>
	);
};

const StripeButton = styled.button`
	display: flex;
	align-items: center;
	margin-left: auto;
	padding: 1.5rem 5rem;
	background-color: #00397a;
	border: none;
	color: white;
	border-radius: 5rem;
	font-size: 2rem;
	position: relative;
	cursor: pointer;
	outline: none;
	min-width: 23.4rem;

	/* &::after {
		content: 'processing...';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: green;
		border-radius: 5rem;
		padding: 1.5rem 5rem;
		font-size: 2rem;
		display: none;
	} */

	@media (max-width: 768px) {
		margin: 0 auto;
		margin-top: 5rem;
	}
`;

const SpinnerWrapper = styled.div`
	transition: all 0.3s ease-in-out;
	position: absolute;
	left: 35%;
	left: ${(state) => state.clicked && '30px'};
	/* transform: translateX(4rem);
	transform: ${(state) =>
		state.clicked ? 'translateX(40px)' : 'translateX(0)'}; */
	opacity: ${(state) => (state.clicked ? 1 : 0)};
`;

export default Stripe;
