import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/AddForm.css';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get('http://localhost:5000/api/students/get-students');
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  return (
    <div className="list-container">
      <h2>Students List</h2>
      <Link to="/students/add" className="form-button">Add Student</Link>
      <ul className="list">
        {students.map(student => (
          <li key={student._id}>
            {student.name} {student.surname} 
            <Link to={`/students/edit/${student._id}`} className="list-button">Edit</Link>
            <Link to={`/students/${student._id}`} className="list-button">View</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
