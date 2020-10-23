import React, { useState } from 'react';
import './ChangeNameAndEmailForm.scss';
import { patchUser } from '../../actions/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '../../utils/ErrorAlert/ErrorAlert';
import { dnsPrefetchControl } from 'helmet';

const ChangeNameAndEmailForm = ({ user }) => {
	// const [name, setName] = useState(user.name);
	// const [email, setEmail] = useState(user.email);
	const [photo, setPhoto] = useState();
	const [error, setError] = useState(null);
	let dispatch = useDispatch();
	let history = useHistory();

	const handleOnChange = (e) => {
		e.target.name === 'photo' && setPhoto(e.target.files[0]);
	};

	// const handleOnSubmit = async (e) => {
	// 	e.preventDefault();

	// 	const formData = new FormData();
	// 	formData.append('photo', photo);
	// 	formData.append('email', email);
	// 	formData.append('name', name);

	// 	await dispatch(patchUser(formData));
	// 	history.go(0);
	// };

	const SignupSchema = Yup.object().shape({
		name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),

		email: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!'),
	});

	return (
		<div>
			<Formik
				initialValues={{
					name: user.name,
					email: user.email,
					photo: photo,
				}}
				validationSchema={SignupSchema}
				onSubmit={async (values) => {
					// same shape as initial values
					const formData = new FormData();
					formData.append('photo', photo);
					formData.append('email', values.email);
					formData.append('name', values.name);

					await dispatch(patchUser(formData));
					history.go(0);
				}}>
				{({ errors, touched, values }) => (
					<Form className='form'>
						<h1 className='form__title'>your account settings</h1>
						<label className='form__label' htmlFor='name'>
							name
						</label>
						<Field
							style={{
								borderBottom: `${
									touched.name
										? errors.name
											? '2px solid red'
											: '2px solid green'
										: null
								}`,
							}}
							placeholder='mail@example.com'
							className='form__input'
							name='name'
							type='text'
							value={values.name}
						/>
						{errors.name && touched.name ? (
							<div>{errors.name}</div>
						) : (
							<div style={{ height: '1.6rem' }}></div>
						)}
						<label className='form__label' htmlFor='email'>
							email
						</label>
						<Field
							style={{
								borderBottom: `${
									touched.email
										? errors.email
											? '2px solid red'
											: '2px solid green'
										: null
								}`,
							}}
							placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;'
							type='email'
							className='form__input'
							name='email'
							value={values.email}
						/>
						{errors.email && touched.email ? (
							<div>{errors.email}</div>
						) : (
							<div style={{ height: '1.6rem' }} />
						)}

						<label className='form__label' htmlFor='confirmPassword'>
							confirm password
						</label>
						<div className='change-form__form-group'>
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

						<button className='form__button' type='submit'>
							submit
						</button>

						{error && <Alert message={error.data.message} />}
					</Form>
				)}
			</Formik>
		</div>

		//   <form onSubmit={(e) => handleOnSubmit(e)} className="change-form">
		//     <h3>Your account settings</h3>
		//     <label htmlFor="name">name</label>
		//     <input
		//       onChange={(e) => handleOnChange(e)}
		//       value={name}
		//       className="change-form__name-input"
		//       type="text"
		//       id="name"
		//       name="name"
		//     />

		//     <label htmlFor="email">email</label>
		//     <input
		//       onChange={(e) => handleOnChange(e)}
		//       value={email}
		//       className="change-form__email-input"
		//       type="email"
		//       id="email"
		//       name="email"
		//     />

		//     <div className="change-form__form-group">
		//       <img src={`uploads/users/${user.photo}`} alt="" />
		//       <input
		//         onChange={(e) => handleOnChange(e)}a
		//         style={{ display: 'none' }}
		//         className="form__file-input"
		//         type="file"
		//         id="files"
		//         name="photo"
		//       />
		//       <label style={{ cursor: 'pointer' }} htmlFor="files">
		//         Choose new photo
		//       </label>
		//     </div>
		//     <div className="change-form__button-container">
		//       <button className="change-form__button" type="submit">
		//         submit form
		//       </button>
		//     </div>
		//   </form>
		// );
	);
};

export default ChangeNameAndEmailForm;
