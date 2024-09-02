import Student from '../models/StudentModel.js';  // Assuming you have a Student model

// Create a new student
export const addStudent = async (req, res) => {
    const { name, surname, email, grade } = req.body;  // Changed className to grade
    try {
      const newStudent = new Student({ name, surname, email, grade });  // Changed className to grade
      const savedStudent = await newStudent.save();
      res.status(201).json({ success: true, data: savedStudent });
    } catch (error) {
      res.status(500).json({ message: 'Error adding student', error });
    }
  };
  

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
};

// Update a student
export const updateStudent = async (req, res) => {
  const { name, surname, email, grade } = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, surname, email, grade },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};
