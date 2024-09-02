import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/AddForm.css';

function AddStudent() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/students/add-student', {
        name,
        surname,
        email,
        grade,
      });
      if (response.data.success) {
        alert('Student added successfully');
        navigate('/students');
      } else {
        alert('Failed to add student');
      }
    } catch (error) {
      console.error('Error adding student:', error.response ? error.response.data : error.message);
      alert('An error occurred while adding the student.');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Student</h2>
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
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        />
        <button type="submit" className="form-button">Add Student</button>
      </form>
    </div>
  );
}

export default AddStudent;
