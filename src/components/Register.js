import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../store/authActions';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };
    dispatch(register(user));
    navigate('/');
  };

  return (
    <Form onSubmit={handleSubmit} className='container-form'>
      <h2>Register</h2>
      <Form.Group className='group-form'>
        <Form.Label className='label-form'>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>
      <Form.Group className='group-form'>
        <Form.Label className='label-form'>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>
      <Button type="submit" className='btn-form'>Register</Button>
    </Form>
  );
};

export default Register;