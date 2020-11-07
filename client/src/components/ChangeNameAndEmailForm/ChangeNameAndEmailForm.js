import React, { useState } from 'react';
import './ChangeNameAndEmailForm.scss';
import { patchUser } from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '../../utils/ErrorAlert/ErrorAlert';
import Spinner from '../../utils/Loader.js/Spinner';
import styled from 'styled-components';
import ButtonWithSpinner from '../../utils/ButtonWithSpinner/ButtonWithSpinner';

import { dnsPrefetchControl } from 'helmet';

const ChangeNameAndEmailForm = ({ user }) => {
	// const [name, setName] = useState(user.name);
	// const [email, setEmail] = useState(user.email);
	const auth = useSelector((state) => state.auth);
	const [photo, setPhoto] = useState();
	const [error, setError] = useState(null);
	const [clicked, setClicked] = useState(false);
	let dispatch = useDispatch();
	let history = useHistory();

	const handleOnChange = (e) => {
		e.target.name === 'photo' && setPhoto(e.target.files[0]);
	};

	const SignupSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
		email: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
	});

	return (
		<div className='changeName__wrapper'>
			<Formik
				initialValues={{
					name: user.name,
					email: user.email,
				}}
				validationSchema={SignupSchema}
				onSubmit={async (values) => {
					setClicked(true);
					// same shape as initial values
					const formData = new FormData();
					formData.append('photo', photo);
					formData.append('email', values.email);
					formData.append('name', values.name);
					try {
						await axios.patch(`/api/v1/users/updateMe`, formData, {
							withCredentials: true,
						});
						setClicked(false);
						history.go(0);
					} catch (err) {
						setError(err.response);
						console.log(err.response);
						setClicked(false);
					}
					// await dispatch(patchUser(formData));
				}}>
				{({ errors, touched, values }) => (
					<Form className='form__changeName'>
						<h1 className='form__changeName-title'>your account settings</h1>
						<label className='form__changeName-label' htmlFor='name'>
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
							placeholder='mail@example.com'
							className='form__changeName-input'
							name='name'
							type='text'
							value={values.name}
						/>
						{errors.name && touched.name ? (
							<div>{errors.name}</div>
						) : (
							<div style={{ height: '1.6rem' }}></div>
						)}
						<label className='form__changeName-label' htmlFor='email'>
							email
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
							placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
							type='email'
							className='form__changeName-input'
							name='email'
							value={values.email}
						/>
						{errors.email && touched.email ? (
							<div>{errors.email}</div>
						) : (
							<div style={{ height: '1.6rem' }} />
						)}

						<div className='form__changeName-group'>
							<img src={`uploads/users/${user.photo}`} alt='' />
							<Field
								style={{ display: 'none' }}
								className='form__file-input'
								type='file'
								id='files'
								name='photo'
								onChange={(e) => handleOnChange(e)}
							/>
							{errors.confirmPassword && touched.confirmPassword ? (
								<div>{errors.confirmPassword}</div>
							) : (
								<div style={{ height: '1.6rem' }} />
							)}

							<label style={{ cursor: 'pointer' }} htmlFor='files'>
								Choose new photo
							</label>
						</div>

						<ButtonWithSpinner
							className='form__changeName-button'
							title='submit'
							clicked={clicked}
						/>
						{/* </button> */}

						{error && <Alert message={error.data.message} />}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ChangeNameAndEmailForm;
