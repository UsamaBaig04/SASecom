import React, { useState } from 'react';
import '../styles/Modal.css';
import { MdOutlineClose } from "react-icons/md";

export const Modal = ({ message, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    message: message || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = 'First name is required';
    if (!formData.lastName) errors.lastName = 'Last name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone)) errors.phone = 'Phone number must be 10 digits';
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState, 
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xyyroond', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form submitted successfully');
        onClose();
      } else {
        console.error('Form submission error');
      }
    } catch (error) {
      console.error('Form submission error', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  function removeHtmlTags(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || '';
}
const finalMessage = removeHtmlTags(formData.message)
console.log("final message is ",finalMessage)
  return (
    <div className='modalBackground'>
      <div className='formContain'>
        <form className='formContainer1' onSubmit={handleSubmit}>
          <div className="closeDiv">
            {/* <h3>Get In Touch</h3> */}
            <MdOutlineClose onClick={onClose} size={30} id='closeButton' />
          </div>
          <div className="contactInfo">
            <input 
              type='text' 
              placeholder='First Name...' 
              name='firstName' 
              value={formData.firstName} 
              onChange={handleChange} 
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
            <input 
              type='text' 
              placeholder='Last Name...' 
              name='lastName' 
              value={formData.lastName} 
              onChange={handleChange} 
            />
            {errors.lastName && <p className="error">{errors.lastName}</p>}
            <input 
              type='email' 
              placeholder='Email...' 
              name='email' 
              value={formData.email} 
              onChange={handleChange} 
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <input 
              type='number' 
              placeholder='Phone...' 
              name='phone' 
              value={formData.phone} 
              onChange={handleChange} 
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
           
          </div>
          <div className="addressInfo">
          {/* <input 
              type='text' 
              placeholder='Address' 
              name='address' 
              value={formData.address} 
              onChange={handleChange} 
              style={{fontSize:'1rem'}}
            /> */}
            <textarea 
              name='message' 
              placeholder='Type your message here' 
              value={finalMessage} 
              onChange={handleChange} 
              style={{fontSize:'1.1rem',paddingTop:'1vh'}}
            />
            {errors.message && <p className="error">{errors.message}</p>}
          </div>
          <button type="submit" disabled={isSubmitting} className='bg-[red] h-12 rounded-xl text-lg text-white hover:bg-red-400'>
            {isSubmitting ? 'Submitting...' : 'SUBMIT'}
          </button>
        </form>
      </div>
    </div>
  );
};
