import './Me.scss';

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../actions/index';
import { FiSettings, FiBriefcase, FiStar, FiCreditCard } from 'react-icons/fi';
import ChangeNameAndEmailForm from '../ChangeNameAndEmailForm/ChangeNameAndEmailForm';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';

const Me = () => {
  let dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const history = useHistory();

  // useEffect(() => {
  //   dispatch(getUser());
  // }, []);

  return (
    <div className="me">
      <div className="me__sidemenu">
        <ul className="me__list">
          <li className="me__list-item">
            <FiSettings />
            <a href="">settings</a>
          </li>
          <li className="me__list-item">
            <FiBriefcase />
            <a href="">my bookings</a>
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
  );
};

export default Me;
