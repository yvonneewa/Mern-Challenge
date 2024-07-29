import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutation';

function SignupForm() {
  const [addUser] = useMutation(ADD_USER);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await addUser({
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

export default SignupForm;
