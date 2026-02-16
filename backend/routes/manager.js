const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/all', (req, res) => {
  db.query(
    `SELECT a.*, u.name, u.employeeId, u.department 
     FROM attendance a 
     JOIN users u ON a.userId = u.id 
     ORDER BY a.date DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
});


router.get('/dashboard', (req, res) => {

  const today = new Date().toISOString().split('T')[0];


  db.query("SELECT * FROM users WHERE role='employee'", (err, employees) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query("SELECT * FROM attendance WHERE date = ?", [today], (err2, todayAttendance) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const totalEmployees = employees.length;

      const present = todayAttendance.filter(a => a.status === 'present').length;
      const late = todayAttendance.filter(a => a.status === 'late').length;
      const halfDay = todayAttendance.filter(a => a.status === 'half-day').length;

      const presentIds = todayAttendance.map(a => a.userId);

      const absentEmployees = employees.filter(emp => !presentIds.includes(emp.id));

      const absent = absentEmployees.length;

      res.json({
        totalEmployees,
        todayAttendance: {
          present,
          late,
          halfDay,
          absent
        },
        absentEmployees
      });

    });
  });

});


module.exports = router;


