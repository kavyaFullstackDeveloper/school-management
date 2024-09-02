import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEditForm.css';

function EditTeacher() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(` https://school-management-tat3.onrender.com/api/teachers/:${id}/get-teacher`);
        const teacher = response.data;
        setName(teacher.name);
        setSurname(teacher.surname);
        setEmail(teacher.email);
        setSubject(teacher.subject);
      } catch (error) {
        console.error('Error fetching teacher details:', error);
        alert('An error occurred while fetching teacher details.');
      }
    };
    fetchTeacher();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/teachers/${id}/update-teacher`, {
        name,
        surname,
        email,
        subject,
      });
      if (response.data.success) {
        alert('Teacher updated successfully');
        navigate('/teachers');
      } else {
        alert('Failed to update teacher');
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
      alert('An error occurred while updating the teacher.');
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Teacher</h2>
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
        <button type="submit" className="form-button">Update Teacher</button>
      </form>
    </div>
  );
}

export default EditTeacher;
