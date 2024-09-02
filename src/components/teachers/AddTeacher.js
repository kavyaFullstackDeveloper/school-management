import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import './AddEditForm.css';

function AddTeacher() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(' https://school-management-tat3.onrender.com/api/teachers/add-teacher', {
        name,
        surname,
        email,
        subject,
      });
      if (response.data.success) {
        alert('Teacher added successfully');
        navigate('/teachers');
      } else {
        alert('Failed to add teacher');
      }
    } catch (error) {
      console.error('Error adding teacher:', error);
      alert('An error occurred while adding the teacher.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Teacher</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
       <button type="submit" className="form-button">Add Teacher</button>
      </form>
    </div>
  );
}

export default AddTeacher;
