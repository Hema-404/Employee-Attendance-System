const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/register', (req, res) => {
  const { name, email, password, role, employeeId, department } = req.body;

  
  db.query(
    'SELECT * FROM users WHERE email=? OR employeeId=?',
    [email, employeeId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        return res
          .status(400)
          .json({ error: 'Email or Employee ID already exists' });
      }

      db.query(
        'INSERT INTO users (name, email, password, role, employeeId, department) VALUES (?,?,?,?,?,?)',
        [name, email, password, role, employeeId, department],
        (err2, result) => {
          if (err2) return res.status(500).json({ error: err2.message });
          res.json({ message: 'Registered successfully!' });
        }
      );
    }
  );
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email=?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(400).json({ error: 'User not found' });

    const user = results[0];

  
    if (password !== user.password)
      return res.status(400).json({ error: 'Wrong password' });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        employeeId: user.employeeId,
      },
    });
  });
});

module.exports = router;
