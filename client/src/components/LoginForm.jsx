import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; // Ensure this path is correct

function LoginForm() {
  const [loginUser] = useMutation(LOGIN_USER);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({
        variables: { ...formData },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Form inputs */}
    </form>
  );
}

export default LoginForm;
