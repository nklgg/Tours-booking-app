import React from 'react';
import styled from 'styled-components';
import Spinner from '../Loader.js/Spinner';
import '../../_index.scss';

const ButtonWithSpinner = ({ clicked, title }) => {
	return (
		<Button>
			{title}
			<SpinnerWrapper clicked={clicked}>
				<Spinner />
			</SpinnerWrapper>
		</Button>
	);
};

const SpinnerWrapper = styled.div`
	/* display: ${(state) => (state.clicked ? 'inline-block' : 'none')}; */
	position: absolute;
	left: 6rem;
	left: ${(state) => state.clicked && '27px'};
	transition: all 0.2s ease-in-out;
	opacity: ${(state) => (state.clicked ? '1' : '0')};
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	position: relative;
	margin-top: 2rem;
	padding: 1.5rem 4rem;
	border-radius: 100rem;
	text-transform: uppercase;
	font-size: 1.5rem;
	background-color: #00397a;
	color: white;
	border: none;
	cursor: pointer;
`;

export default ButtonWithSpinner;
