import { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { FaExclamationCircle } from "react-icons/fa";

export const Login = () => {
  const [formData, setFormData] = useState({
    rollNumber: '',
    name: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    department: '',
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!formData.rollNumber.trim()) {
      validationErrors.rollNumber = 'Roll Number is required';
    }

    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      validationErrors.name = 'Name should only contain letters';
    }

    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      validationErrors.email = 'Invalid email format';
    }

    if (!formData.mobile.trim()) {
      validationErrors.mobile = 'Mobile number is required';
    } else if (!/^\+?[0-9]{10,13}$/.test(formData.mobile)) {
      validationErrors.mobile = 'Invalid mobile number';
    }

    if (!formData.dob.trim()) {
      validationErrors.dob = 'Date of Birth is required';
    }

    if (!formData.gender) {
      validationErrors.gender = 'Gender is required';
    }

    if (!formData.department.trim()) {
      validationErrors.department = 'Department is required';
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('https://66c77724732bf1b79fa6a0c7.mockapi.io/data', formData);
        console.log('Form data submitted successfully:', response.data);
        navigate('/table');
        setFormData({
          rollNumber: '',
          name: '',
          email: '',
          mobile: '',
          dob: '',
          gender: '',
          department: '',
        });
        setErrors({});
      } catch (error) {
        console.error('Error submitting form data:', error);
      }
    }
  };

  return (
    <div className="loginform-container">
      <form className="form-container"  onSubmit={handleSubmit}>
        <h1>Register Form</h1>
        <div className="element-container">
          <label>Roll Number</label>
          <div className="input-with-icon">
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              className={errors.rollNumber ? 'error' : ''}
            />
            {errors.rollNumber && <FaExclamationCircle className="error-icon" />}
          </div>
          {errors.rollNumber && <p className="error">{errors.rollNumber}</p>}
        </div>

        <div className="element-container">
          <label>Name</label>
          <div className="input-with-icon">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <FaExclamationCircle className="error-icon" />}
          </div>
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div className="element-container">
          <label>Email</label>
          <div className="input-with-icon">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <FaExclamationCircle className="error-icon" />}
          </div>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="element-container">
          <label>Mobile</label>
          <div className="input-with-icon">
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={errors.mobile ? 'error' : ''}
            />
            {errors.mobile && <FaExclamationCircle className="error-icon" />}
          </div>
          {errors.mobile && <p className="error">{errors.mobile}</p>}
        </div>

        <div className="element-container">
          <label>Date of Birth</label>
          <div className="input-with-icon">
            <input
              type="text"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className={errors.dob ? 'error' : ''}
            />
            {errors.dob && <FaExclamationCircle className="error-icon" />}
          </div>
          {errors.dob && <p className="error">{errors.dob}</p>}
        </div>

        <div className="element-container">
          <label>Gender</label>
          <div className="input-with-icon">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
              className={errors.gender ? 'error' : ''}
            />
            <label htmlFor="female">Female</label>
            {errors.gender && <FaExclamationCircle className="error-icon" />}
          </div>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        <div className="element-container">
          <label>Department</label>
          <div className="input-with-icon">
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={errors.department ? 'error' : ''}
            />
            {errors.department && <FaExclamationCircle className="error-icon" />}
          </div>
          {errors.department && <p className="error">{errors.department}</p>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
