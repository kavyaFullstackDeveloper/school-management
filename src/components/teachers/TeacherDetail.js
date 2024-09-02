import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Details.css';

function TeacherDetails() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/teachers/${id}`);
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching teacher details:', error);
        alert('An error occurred while fetching teacher details.');
      }
    };
    fetchTeacher();
  }, [id]);

  if (!teacher) return <div>Loading...</div>;

  return (
    <div className="details-container">
      <h2>Teacher Details</h2>
      <p><strong>Name:</strong> {teacher.name} {teacher.surname}</p>
      <p><strong>Email:</strong> {teacher.email}</p>
      <p><strong>Subject:</strong> {teacher.subject}</p>
      <Link to={`/edit-teacher/${teacher._id}`} className="details-button">Edit</Link>
    </div>
  );
}

export default TeacherDetails;
