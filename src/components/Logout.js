import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authActions';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return <Button className="logout" onClick={handleLogout}>Logout</Button>;
};

export default Logout;