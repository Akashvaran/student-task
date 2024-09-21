import { useState } from 'react';
import './Singin.css'; 

export const Singin = () => { 
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const validationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      validationErrors.name = 'Name should only contain letters and spaces';
    }

    // Email validation
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted successfully:', formData);
      setFormData({
        name: '',
        email: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Sign In</h1>
        <div className="element-container">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="element-container">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};
