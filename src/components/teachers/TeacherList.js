import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './List.css';
import { Link } from 'react-router-dom';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(' https://school-management-tat3.onrender.com/api/teachers/get-teachers');
        setTeachers(response.data.data); // assuming response.data.data contains the teachers array
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

 

  return (
    <div className="list-container ">
      <h2>Teacher List</h2>
      {teachers.length === 0 ? (
        <div>
          <p>No teachers found.</p>
          <Link Link to="/teachers/add">
            <button className="list-button" >
            Add Teacher
            </button>
          </Link> 
        </div>
      ) : (
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher._id}>{teacher.name} {teacher.surname} - {teacher.subject}</li>
          ))}
        </ul>
      )}
       <Link to="/teachers/add" className="list-button">Add Teacher</Link>
      <ul className="list">
        {teachers.map(teacher => (
          <li key={teacher._id}>
            {teacher.name} {teacher.surname} 
            <Link to={`/students/edit/${teacher._id}`} className="list-button">Edit</Link>
            <Link to={`/students/${teacher._id}`} className="list-button">View</Link>
          </li>
        ))}
      </ul>
      {teachers.length > 0 && (
         <Link Link to="/teachers/add">
        <button className="list-button" >
          Add Another Teacher
        </button>
        </Link>
      )}
    </div>
  );
}

export default TeacherList;
