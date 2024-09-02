import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StudentDetails.css';

function StudentDetails() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/:${id}//get-student`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error.response ? error.response.data : error.message);
      }
    };
    fetchStudentDetails();
  }, [id]);

  if (!student) {
    return <p>Loading student details...</p>;
  }

  return (
    <div className="student-details-container">
      <h2>Student Details</h2>
      <p><strong>Name:</strong> {student.name} {student.surname}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Grade:</strong> {student.grade}</p>
    </div>
  );
}

export default StudentDetails;
