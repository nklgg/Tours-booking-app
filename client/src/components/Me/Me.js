import './Me.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiSettings, FiBriefcase, FiStar, FiCreditCard } from 'react-icons/fi';
import ChangeNameAndEmailForm from '../ChangeNameAndEmailForm/ChangeNameAndEmailForm';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';

const Me = () => {
  const user = useSelector((state) => state.auth);


  return (

    <div className="me">
      <div className="me__sidemenu">
        <ul className="me__list">
          <li className="me__list-item">
            <FiSettings />
            <Link to={'/me'} href="">settings</Link>
          </li>
          <li className="me__list-item">
            <FiBriefcase />
            <Link to='/my-tours' href="">my bookings</Link>
          </li>
          <li className="me__list-item">
            <FiStar />
            <a href="">my reviews</a>
          </li>
          <li className="me__list-item">
            <FiCreditCard />
            <a href="">billings</a>
          </li>
        </ul>
      </div>
      <div className="me__forms-container">
        <ChangeNameAndEmailForm user={user.user} />
        <PasswordChangeForm />
      </div>
    </div>
  )

};

export default Me;
