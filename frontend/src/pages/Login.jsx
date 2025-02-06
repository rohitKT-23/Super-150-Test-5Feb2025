import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <AuthForm type="login" />
  </div>
);

export default Login;