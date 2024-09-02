import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import StudentList from './components/students/StudentList';
import TeacherList from './components/teachers/TeacherList';
import AddStudent from './components/students/AddStudent';
import EditStudent from './components/students/EditStudent';
import StudentDetail from './components/students/StudentDetail';
import AddTeacher from './components/teachers/AddTeacher';
import EditTeacher from './components/teachers/EditTeacher';
import TeacherDetail from './components/teachers/TeacherDetail';
import './components/styles/Dashboard.css';
import LoginForm from './components/authentication/Loginform';
import RegisterForm from './components/authentication/Registerform';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginForm/>} /> 
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/students/edit/:id" element={<EditStudent />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/teachers/add" element={<AddTeacher />} />
        <Route path="/teachers/edit/:id" element={<EditTeacher />} />
        <Route path="/teachers/:id" element={<TeacherDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
