import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../../actions/index';
import styled from 'styled-components';
// import './Signin.scss';
import Loader from '../../utils/Loader.js/Spinner';
import { Formik, Form, Field } from 'formik';
import Alert from '../../utils/ErrorAlert/ErrorAlert'
import * as Yup from 'yup';
import Spinner from '../../utils/Loader.js/Spinner'

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

      passwordConfirm:  Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),

    email: Yup.string().email('Invalid email').required('Required'),
 

  });


  return (
    <div style={{minHeight: '120vh', paddingBottom: '5rem'}}>
   
     <Formik
       initialValues={{
         name: '',
         email: '',
         password: '',
         passwordConfirm: ''
       }}
       validationSchema={SignupSchema}
       onSubmit={  values => {
         // same shape as initial values
           dispatch(signUp(values));

         console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form className="form">
             <h1 className="form__title">create your account!</h1>

             <label className="form__label" htmlFor="name">name</label>
           <Field 							style={{
								borderBottom: `${
									touched.name
										? errors.name
											? '2px solid red'
											: '2px solid green'
										: null
								}`,
							}} placeholder="Enter your name" className="form__input" name="name" />
           {errors.name && touched.name ? (
             <div>{errors.name}</div>
           ) : <div style={{height: '1.6rem'}}></div>}

           <label className="form__label" htmlFor="email">email address</label>
           <Field 							style={{
								borderBottom: `${
									touched.email
										? errors.email
											? '2px solid red'
											: '2px solid green'
										: null
								}`,
							}} placeholder="mail@example.com" className="form__input" name="email" />
           {errors.email && touched.email ? (
             <div>{errors.email}</div>
           ) : <div style={{height: '1.6rem'}}></div>}
            <label className="form__label" htmlFor="email">password</label>
           <Field 							style={{
								borderBottom: `${
									touched.password
										? errors.password
											? '2px solid red'
											: '2px solid green'
										: null
								}`,
							}} placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" type="password" className="form__input" name="password" />
           {errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : <div style={{height: '1.6rem'}} />}

<label className="form__label" htmlFor="passwordConfirm">confirm password</label>
           <Field 							style={{
								borderBottom: `${
									touched.passwordConfirm
										? errors.passwordConfirm
											? '2px solid red'
											: '2px solid green'
										: null
								}`,
							}} placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;" type="password" className="form__input" name="passwordConfirm" />
           {errors.passwordConfirm && touched.passwordConfirm ? (
             <div>{errors.passwordConfirm}</div>
           ) : <div style={{height: '1.6rem'}} />}
          
           <button style={{position: 'relative', display: 'flex', alignItems: 'center'}} className="form__button"  type="submit">submit <SpinnerWrapper clicked={auth.loading}><Spinner 
              />
             </SpinnerWrapper> </button>
           {/* <span>{auth.loading && <Loader />}</span> */}

      
           {/* <p style={{textAlign: 'center', fontSize: '2rem', color: 'red'}}>{auth.loginError && auth.loginError.data.message}</p> */}
           {auth.signUpError ? <Alert message={auth.signUpError.data.message} /> : <div style={{height: '3.6rem', marginTop: '2rem'}}></div>}
         </Form>
       )}
     </Formik>
   </div>

  )






     

};

const SpinnerWrapper = styled.div `
	/* display: ${state => state.clicked ? 'inline-block' : 'none'}; */
	position: absolute;
	left: 40%;
	left: ${state => state.clicked && '20%'};
	transition: all .2s ease-in-out;
	opacity: ${state => state.clicked ? '1' : '0'};


`

export default Signup;
