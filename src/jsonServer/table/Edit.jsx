/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Edit.css'; // Create this CSS file to style the form
import { FaExclamationCircle } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";

export const EditForm = ({ item, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(item);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(item);
  }, [item]);

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
        await axios.put(`https://66c77724732bf1b79fa6a0c7.mockapi.io/data/${item.id}`, formData);
        onUpdate();
        onClose();
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  };

  return (
    <div className="editform-overlay">
      <div className="editform-content">
        <div className='editfrom-head'><h2>Edit Item</h2>
          <h1 className='closebutton' onClick={onClose}><IoClose/></h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Roll Number</label>
            <div className="input-container">
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                className={errors.rollNumber ? 'error' : ''}
              />
              {errors.rollNumber && <FaExclamationCircle className="error-icon" />}
            </div>
            {errors.rollNumber && <p className="error-message">{errors.rollNumber}</p>}
          </div>

          <div className="form-group">
            <label>Name</label>
            <div className="input-container">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <FaExclamationCircle className="error-icon" />}
            </div>
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <div className="input-container">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <FaExclamationCircle className="error-icon" />}
            </div>
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label>Mobile</label>
            <div className="input-container">
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className={errors.mobile ? 'error' : ''}
              />
              {errors.mobile && <FaExclamationCircle className="error-icon" />}
            </div>
            {errors.mobile && <p className="error-message">{errors.mobile}</p>}
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <div className="input-container">
              <input
                type="text"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={errors.dob ? 'error' : ''}
              />
              {errors.dob && <FaExclamationCircle className="error-icon" />}
            </div>
            {errors.dob && <p className="error-message">{errors.dob}</p>}
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="input-container">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={errors.gender ? 'error' : ''}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <FaExclamationCircle className="error-icon" />}
            </div>
            {errors.gender && <p className="error-message">{errors.gender}</p>}
          </div>

          <div className="form-group">
            <label>Department</label>
            <div className="input-container">
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={errors.department ? 'error' : ''}
              />
              {errors.department && <FaExclamationCircle className="error-icon" />}
            </div>
            {errors.department && <p className="error-message">{errors.department}</p>}
          </div>

          <button type="submit">Save</button>

        </form>
      </div>
    </div>
  );
};
