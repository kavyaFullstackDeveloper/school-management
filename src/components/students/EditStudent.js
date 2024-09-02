import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/AddForm.css';

function EditStudent() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/:${id}/update-student`);
        const student = response.data;
        setName(student.name);
        setSurname(student.surname);
        setEmail(student.email);
        setGrade(student.grade);
      } catch (error) {
        console.error('Error fetching student:', error.response ? error.response.data : error.message);
      }
    };
    fetchStudent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/students/${id}`, {
        name,
        surname,
        email,
        grade,
      });
      if (response.data.success) {
        alert('Student updated successfully');
        navigate('/students');
      } else {
        alert('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error.response ? error.response.data : error.message);
      alert('An error occurred while updating the student.');
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Student</h2>
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
        <button type="submit" className="form-button">Update Student</button>
      </form>
    </div>
  );
}

export default EditStudent;
