const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getStudentById = async (req, res) => {
    const { student_id } = req.params;

    try {
        const [rows] = await pool.query('SELECT lname, fname, mi, user_id, course_id, created_at, updated_at FROM departments WHERE dept_id = ?', [student_id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createStudent = async (req, res) => {
    const { student_id } = req.params;
    const { lname, fname, mi, age, gender, user_id, course_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO students (lname, fname, mi, age, gender, user_id, course_id) VALUES (?, ?, ?, ?, ?, ?, ?)', [lname, fname, mi, age, gender, user_id, course_id]);
        res.status(201).json({ student_id: result.insertId, lname, fname, mi, age, gender, user_id, course_id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateStudent = async (req, res) => {
    const { student_id } = req.params;
    const { lname, fname, mi, age, gender } = req.body;

    try {
        const [result] = await pool.query('UPDATE students SET lname = ?, fname = ?, mi = ?, age = ?, gender = ? WHERE student_id = ?', [lname, fname, mi, age, gender, student_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json({ message: 'Student updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteStudent = async (req, res) => {
    const { student_id } = req.params;
  
    try {
      const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [student_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json({ message: 'Student deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const getAllStudents = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM students');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent };