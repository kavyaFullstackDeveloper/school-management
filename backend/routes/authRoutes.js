import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/UserModel.js';
import config from '../config/db.js';

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').isIn(['student', 'teacher']),
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        name,
        email,
        password,
        role
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the new user to the database
      await user.save();

      // Create payload for JWT
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      // Generate JWT token
      jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: '5h' }, 
        (err, token) => {
          if (err) {
            console.error('JWT generation error:', err.message);
            return res.status(500).json({ success: false, msg: 'JWT generation failed' });
          }
          // Send response with success status and token
          res.status(201).json({ success: true, token, msg: 'User registered successfully' });
        }
      );

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Login route
router.post(
  '/login', 
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Compare the password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Create payload for JWT
      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      // Generate JWT token
      jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: '5h' }, 
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ success: true, token, msg: 'Login successful' });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;
