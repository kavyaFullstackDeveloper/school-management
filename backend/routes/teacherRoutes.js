import express from 'express';
import {addTeacher,getAllTeachers,getTeacherById,updateTeacher,deleteTeacher} from '../controllers/teacherController.js';


const router = express.Router();


router.post('/add-teacher', addTeacher);

router.get('/get-teachers', getAllTeachers);


router.get('/:id/get-teacher', getTeacherById);


router.put('/:id/update-teacher', updateTeacher)

router.delete('/:id/delete-teacher', deleteTeacher);

export default router;
