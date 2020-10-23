import './PasswordChangeForm.scss';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '../../utils/ErrorAlert/ErrorAlert';

const PasswordChangeForm = () => {
	// const [currentPassword, setCurrentPassword] = useState('');
	// const [newPassword, setNewPassword] = useState('');
	// const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState(null);
	let history = useHistory();

	// const handleOnChange = (e) => {
	// 	e.target.name === 'currentPassword' && setCurrentPassword(e.target.value);
	// 	e.target.name === 'newPassword' && setNewPassword(e.target.value);
	// 	e.target.name === 'confirmPassword' && setConfirmPassword(e.target.value);
	// };

	// console.log(currentPassword, newPassword, confirmPassword);

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	try {
	// 		const res = await axios.patch(
	// 			`/api/v1/users/updateMyPassword`,
	// 			{
	// 				passwordCurrent: currentPassword,
	// 				password: newPassword,
	// 				passwordConfirm: confirmPassword,
	// 			},
	// 			{
	// 				withCredentials: true,
	// 			}
	// 		);
	// 		history.push('/');
	// 	} catch (err) {
	// 		console.log(err.response);
	// 		setError(err.response);
	// 	}
	// };

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
		<div>
			<Formik
				initialValues={{
					currentPassword: '',
					newPassword: '',
					confirmPassword: '',
				}}
				validationSchema={SignupSchema}
				onSubmit={async (values) => {
					// same shape as initial values
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
					}
				}}>
				{({ errors, touched }) => (
					<Form className='form'>
						<h1 className='form__title'>password change</h1>
						<label className='form__label' htmlFor='currentPassword'>
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
											: '2px solid green'
										: null
								}`,
							}}
							placeholder='mail@example.com'
							className='form__input'
							name='currentPassword'
							type='password'
						/>
						{errors.currentPassword && touched.currentPassword ? (
							<div>{errors.currentPassword}</div>
						) : (
							<div style={{ height: '1.6rem' }}></div>
						)}
						<label className='form__label' htmlFor='newPassword'>
							new password
						</label>
						<Field
							style={{
								borderBottom: `${
									touched.newPassword
										? errors.newPassword
											? '2px solid red'
											: '2px solid green'
										: null
								}`,
							}}
							placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
							type='password'
							className='form__input'
							name='newPassword'
						/>
						{errors.newPassword && touched.newPassword ? (
							<div>{errors.newPassword}</div>
						) : (
							<div style={{ height: '1.6rem' }} />
						)}

						<label className='form__label' htmlFor='confirmPassword'>
							confirm password
						</label>
						<Field
							style={{
								borderBottom: `${
									touched.confirmPassword
										? errors.confirmPassword
											? '2px solid red'
											: '2px solid green'
										: null
								}`,
							}}
							placeholder='mail@example.com'
							className='form__input'
							name='confirmPassword'
							type='password'
						/>
						{errors.confirmPassword && touched.confirmPassword ? (
							<div>{errors.confirmPassword}</div>
						) : (
							<div style={{ height: '1.6rem' }} />
						)}

						<button className='form__button' type='submit'>
							submit
						</button>

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
