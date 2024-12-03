const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get student by ID
const getStudentById = async (req, res) => {
    const { student_id } = req.params;

    try {
        const [rows] = await pool.query(
            'SELECT lname, fname, mi, gender, user_id, course_id, created_at, updated_at FROM students WHERE student_id = ?', 
            [student_id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new student
const createStudent = async (req, res) => {
    const { lname, fname, mi, gender, user_id, course_id } = req.body;

    // Validate required fields
    if (!lname || !fname || !gender || !user_id || !course_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO students (lname, fname, mi, gender, user_id, course_id) VALUES (?, ?, ?, ?, ?, ?)', 
            [lname, fname, mi, gender, user_id, course_id]
        );
        res.status(201).json({ student_id: result.insertId, lname, fname, mi, gender, user_id, course_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update student information
const updateStudent = async (req, res) => {
    const { student_id } = req.params;
    const { lname, fname, mi, gender } = req.body;

    // Validate required fields
    if (!lname || !fname || !gender) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await pool.query(
            'UPDATE students SET lname = ?, fname = ?, mi = ?, gender = ? WHERE student_id = ?', 
            [lname, fname, mi, gender, student_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    const { student_id } = req.params;

    // Validate student_id
    if (!student_id) {
        return res.status(400).json({ error: 'Student ID is required' });
    }

    try {
        const [result] = await pool.query(
            'DELETE FROM students WHERE student_id = ?', 
            [student_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all students
const getAllStudents = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;  // Default to page 1, limit 10
    const offset = (page - 1) * limit;

    try {
        const [rows] = await pool.query(
            'SELECT * FROM students LIMIT ? OFFSET ?', 
            [parseInt(limit), parseInt(offset)]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };
