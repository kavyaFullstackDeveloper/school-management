import express from 'express';

import {addStudent,getAllStudents,getStudentById,updateStudent,deleteStudent} from '../controllers/studentController.js';

const router = express.Router();

// Create a student

router.post("/add-student", addStudent);

// Get all students
router.get('/get-students', getAllStudents);


// Get a single student
router.get('/:id/get-student', getStudentById);

// Update a student
router.put('/:id/update-student', updateStudent);

// Delete a student
router.delete('/:id/delete-student', deleteStudent);


export default router;

