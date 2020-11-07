import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../actions/index';
import styled from 'styled-components';
import Loader from '../../utils/Loader.js/Spinner';
import './Signup.scss';
import { Formik, Form, Field } from 'formik';
import Alert from '../../utils/ErrorAlert/ErrorAlert';
import * as Yup from 'yup';
import Spinner from '../../utils/Loader.js/Spinner';
import ButtonWithSpinner from '../../utils/ButtonWithSpinner/ButtonWithSpinner';

const Signup = () => {
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');
	const [clicked, setClicked] = useState(false);

	let history = useHistory();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (auth.authenticated === true) {
			history.push('/');
		}
	}, [auth.authenticated]);

	const SignupSchema = Yup.object().shape({
		password: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),

		passwordConfirm: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),

		email: Yup.string().email('Invalid email').required('Required'),
	});

	return (
		<div className='signup__wrapper'>
			<Formik
				initialValues={{
					name: '',
					email: '',
					password: '',
					passwordConfirm: '',
				}}
				validationSchema={SignupSchema}
				onSubmit={(values) => {
					// same shape as initial values
					dispatch(signUp(values));

					console.log(values);
				}}>
				{({ errors, touched }) => (
					<Form style={{ marginTop: '10rem' }} className='signup__form'>
						<h1 className='signup__form-title'>create your account!</h1>

						<label className='signup__form-label' htmlFor='name'>
							name
						</label>
						<Field
							style={{
								borderBottom: `${
									touched.name
										? errors.name
											? '2px solid #ff6854'
											: '2px solid #35de9d'
										: null
								}`,
							}}
							placeholder='Enter your name'
							className='signup__form-input'
							name='name'
						/>
						{errors.name && touched.name ? (
							<div>{errors.name}</div>
						) : (
							<div style={{ height: '1.6rem' }}></div>
						)}

						<label className='signup__form-label' htmlFor='email'>
							email address
						</label>
						<Field
							style={{
								borderBottom: `${
									touched.email
										? errors.email
											? '2px solid #ff6854'
											: '2px solid #35de9d'
										: null
								}`,
							}}
							placeholder='mail@example.com'
							className='signup__form-input'
							name='email'
						/>
						{errors.email && touched.email ? (
							<div>{errors.email}</div>
						) : (
							<div style={{ height: '1.6rem' }}></div>
						)}
						<label className='signup__form-label' htmlFor='email'>
							password
						</label>
						<Field
							style={{
								borderBottom: `${
									touched.password
										? errors.password
											? '2px solid #ff6854'
											: '2px solid #35de9d'
										: null
								}`,
							}}
							placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
							type='password'
							className='signup__form-input'
							name='password'
						/>
						{errors.password && touched.password ? (
							<div>{errors.password}</div>
						) : (
							<div style={{ height: '1.6rem' }} />
						)}

						<label className='signup__form-label' htmlFor='passwordConfirm'>
							confirm password
						</label>
						<Field
							style={{
								borderBottom: `${
									touched.passwordConfirm
										? errors.passwordConfirm
											? '2px solid #ff6854'
											: '2px solid #35de9d'
										: null
								}`,
							}}
							placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
							type='password'
							className='signup__form-input'
							name='passwordConfirm'
						/>
						{errors.passwordConfirm && touched.passwordConfirm ? (
							<div>{errors.passwordConfirm}</div>
						) : (
							<div style={{ height: '1.6rem' }} />
						)}

						{/* <button style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="form__button" type="submit">submit <SpinnerWrapper clicked={auth.loading}><Spinner
            />
            </SpinnerWrapper> </button> */}
						<ButtonWithSpinner title='sign up' clicked={auth.loading} />

						{/* <span>{auth.loading && <Loader />}</span> */}

						{/* <p style={{textAlign: 'center', fontSize: '2rem', color: 'red'}}>{auth.loginError && auth.loginError.data.message}</p> */}
						{auth.signUpError ? (
							<Alert message={auth.signUpError.data.message} />
						) : (
							<div style={{ height: '3.6rem', marginTop: '2rem' }}></div>
						)}
					</Form>
				)}
			</Formik>
		</div>
	);
};

const SpinnerWrapper = styled.div`
	/* display: ${(state) => (state.clicked ? 'inline-block' : 'none')}; */
	position: absolute;
	left: 40%;
	left: ${(state) => state.clicked && '20%'};
	transition: all 0.2s ease-in-out;
	opacity: ${(state) => (state.clicked ? '1' : '0')};
`;

export default Signup;
