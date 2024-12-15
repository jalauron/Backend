const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerBoarder = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert boarder credentials into the database
        const [rows] = await pool.query(
            'INSERT INTO boarders (username, password) VALUES (?, ?)', 
            [username, hashedPassword]
        );

        // Send success response
        res.status(201).json({ message: 'Boarder registered successfully!' });
    } catch (err) {
        // Handle duplicate usernames or other database errors
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: 'Username already exists' });
        }
        res.status(500).json({ error: err.message });
    }
};

const loginBoarder = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Retrieve the boarder by username
        const [rows] = await pool.query(
            'SELECT * FROM boarders WHERE username = ?', 
            [username]
        );

        // Check if boarder exists
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const boarder = rows[0];

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, boarder.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { boarder_id: boarder.boarder_id, username: boarder.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME }
        );

        // Send the token in the response
        res.json({ token });
    } catch (err) {
        // Handle server errors
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerBoarder, loginBoarder };
