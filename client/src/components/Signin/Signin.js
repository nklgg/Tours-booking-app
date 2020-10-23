import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../actions/index';
import styled from 'styled-components';
import './Signin.scss';
import Loader from '../../utils/Loader.js/Spinner';
import { Formik, Form, Field } from 'formik';
import Alert from '../../utils/ErrorAlert/ErrorAlert';
import * as Yup from 'yup';

const Signin = () => {
	// const [email, setEmail] = useState('');
	// const [password, setPassword] = useState('');

	let history = useHistory();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		if (auth.authenticated === true) {
			history.push('/');
		}
	}, [auth.authenticated]);

	// const handleChange = (e) => {
	//   if (e.target.name === 'email') {
	//     setEmail(e.target.value);
	//   } else if (e.target.name === 'password') {
	//     setPassword(e.target.value);

	//   }

	// };

	// const handleSubmit = async (e) => {
	//   e.preventDefault();

	//   dispatch(signIn({ email, password }));
	// };

	const SignupSchema = Yup.object().shape({
		password: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),

		email: Yup.string().email('Invalid email').required('Required'),
	});

	return (
		<div style={{ height: '100vh' }}>
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validationSchema={SignupSchema}
				onSubmit={(values) => {
					// same shape as initial values
					dispatch(signIn(values));

					console.log(values);
				}}>
				{({ errors, touched }) => (
					<Form className='form'>
						<h1 className='form__title'>Signup</h1>
						<label className='form__label' htmlFor='email'>
							email address
						</label>
						<Field
							style={{
								borderBottom: `${
									errors.email ? '2px solid red' : '2px solid green'
								}`,
							}}
							placeholder='mail@example.com'
							className='form__input'
							name='email'
						/>
						{errors.email && touched.email ? (
							<div>{errors.email}</div>
						) : (
							<div style={{ height: '1.6rem' }}></div>
						)}
						<label className='form__label' htmlFor='email'>
							password
						</label>
						<Field
							style={{
								borderBottom: `${
									errors.password ? '2px solid red' : '2px solid green'
								}`,
							}}
							placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
							type='password'
							className='form__input'
							name='password'
						/>
						{errors.password && touched.password ? (
							<div>{errors.password}</div>
						) : (
							<div style={{ height: '1.6rem' }} />
						)}

						<button className='form__button' type='submit'>
							submit
						</button>
						{/* <span>{auth.loading && <Loader />}</span> */}

						{/* <p style={{textAlign: 'center', fontSize: '2rem', color: 'red'}}>{auth.loginError && auth.loginError.data.message}</p> */}
						{auth.loginError ? (
							<Alert message={auth.loginError.data.message} />
						) : (
							<div style={{ height: '3.6rem', marginTop: '2rem' }}></div>
						)}
					</Form>
				)}
			</Formik>
		</div>
		//   <div style={{height: 'calc(100vh - 20rem)'}}>
		//   <form className="form">
		//     <h3 className="form__title">log into your account</h3>

		//     <label className="form__label" htmlFor="email">email address</label>
		//     <input name="email" onChange={e => handleChange(e)} className="form__input" type="email" placeholder="you@example.com"/>

		//     <label className="form__label" htmlFor="email">password</label>
		//     <input name="password" onChange={e => handleChange(e)} className="form__input" type="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"/>

		//     <button onClick={e => handleSubmit(e)} className="form__button">login</button>
		//  {/* {auth.loading === true && <Loader />}
		//       {auth.loginError && <p>{auth.loginError.data.message}</p>} */}
		//   </form>
		//   </div>
	);
};

export default Signin;
