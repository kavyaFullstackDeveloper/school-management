import Teacher from '../models/TeacherModel.js';  // Assuming you have a Teacher model

// Create a new teacher
export const addTeacher = async (req, res) => {
    const { name, surname, email, subject } = req.body;  // Changed className to grade
    try {
      const newTeacher = new Teacher({ name, surname, email, subject });  // Changed className to grade
      const savedTeacher = await newTeacher.save();
      res.status(201).json({ success: true, data: savedTeacher });
    } catch (error) {
      res.status(500).json({ message: 'Error adding teacher', error });
    }
  };
// Get all teachers
export const getAllTeachers = async (req, res) => {
    try {
      const teachers = await Teacher.find();  // Fetches all teachers from the database
      res.status(200).json({ success: true, data: teachers });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching teachers', error });
    }
  };
// Get teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teacher', error });
  }
};

// Update a teacher
export const updateTeacher = async (req, res) => {
  const { name, surname,email, subject } = req.body;
  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { name, surname, email, subject },
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json(updatedTeacher);
  } catch (error) {
    res.status(500).json({ message: 'Error updating teacher', error });
  }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting teacher', error });
  }
};
