import './PasswordChangeForm.scss';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '../../utils/ErrorAlert/ErrorAlert';
import ButtonWithSpinner from '../../utils/ButtonWithSpinner/ButtonWithSpinner';
import './PasswordChangeForm';

const PasswordChangeForm = () => {
	const [error, setError] = useState(null);
	const [clicked, setClicked] = useState(false);
	let history = useHistory();

	const SignupSchema = Yup.object().shape({
		currentPassword: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),

		newPassword: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),

		confirmPassword: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Required'),
	});

	return (
		<div className='changePassword__wrapper'>
			<Formik
				initialValues={{
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				}}
				validationSchema={SignupSchema}
				onSubmit={async (values) => {
					// same shape as initial values
					setClicked(true);
					try {
						const res = await axios.patch(
							`/api/v1/users/updateMyPassword`,
							{
								passwordCurrent: values.currentPassword,
								password: values.newPassword,
								passwordConfirm: values.confirmPassword,
							},
							{
								withCredentials: true,
							}
						);
						history.push('/');
					} catch (err) {
						console.log(err.response);
						setError(err.response);
						setClicked(false);
					}
				}}>
				{({ errors, touched }) => (
					<Form className='changePassword__form'>
						<h1 className='changePassword__form-title'>password change</h1>
						<label
							className='changePassword__form-label'
							htmlFor='currentPassword'>
							current password
						</label>
						<Field
							style={{
								// borderBottom: `${
								// 	touched.currentPassword && errors.currentPassword
								// 		? '2px solid red'
								// 		: '2px solid green'
								// }`,
								borderBottom: `${
									touched.currentPassword
										? errors.currentPassword
											? '2px solid red'
											: '2px solid #35de9d'
										: null
								}`,
							}}
							placeholder='mail@example.com'
							className='changePassword__form-input'
							name='currentPassword'
							type='password'
						/>
						{errors.currentPassword && touched.currentPassword ? (
							<div>{errors.currentPassword}</div>
						) : (
							<div style={{ height: '1.6rem' }}></div>
						)}
						<label className='changePassword__form-label' htmlFor='newPassword'>
							new password
						</label>
						<Field
							style={{
								borderBottom: `${
									touched.newPassword
										? errors.newPassword
											? '2px solid #ff6854'
											: '2px solid #35de9d'
										: null
								}`,
							}}
							placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
							type='password'
							className='changePassword__form-input'
							name='newPassword'
						/>
						{errors.newPassword && touched.newPassword ? (
							<div>{errors.newPassword}</div>
						) : (
							<div style={{ height: '1.6rem' }} />
						)}

						<label
							className='changePassword__form-label'
							htmlFor='confirmPassword'>
							confirm password
						</label>
						<Field
							style={{
								borderBottom: `${
									touched.confirmPassword
										? errors.confirmPassword
											? '2px solid #ff6854'
											: '2px solid #35de9d'
										: null
								}`,
							}}
							placeholder='mail@example.com'
							className='changePassword__form-input'
							name='confirmPassword'
							type='password'
						/>
						{errors.confirmPassword && touched.confirmPassword ? (
							<div>{errors.confirmPassword}</div>
						) : (
							<div style={{ height: '1.6rem' }} />
						)}

						<ButtonWithSpinner
							className='form__changeName-button'
							title='submit'
							clicked={clicked}
						/>

						{error && <Alert message={error.data.message} />}
						{/* <span>{auth.loading && <Loader />}</span> */}

						{/* <p style={{textAlign: 'center', fontSize: '2rem', color: 'red'}}>{auth.loginError && auth.loginError.data.message}</p> */}
						{/* {auth.loginError ? <Alert message={auth.loginError.data.message} /> : <div style={{height: '3.6rem', marginTop: '2rem'}}></div>} */}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default PasswordChangeForm;
