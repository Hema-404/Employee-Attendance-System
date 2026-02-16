const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/checkin',(req,res)=>{
  const { userId } = req.body;
  const now = new Date();
  let status='present';
  if(now.getHours()>9) status='late';
  db.query(
    'INSERT INTO attendance (userId,date,checkInTime,status) VALUES (?,?,?,?)',
    [userId, now.toISOString().split('T')[0], now, status],
    (err,result)=>{
      if(err) return res.status(500).json({error:err.message});
      res.json({message:'Checked in!'});
    }
  );
});


router.post('/checkout',(req,res)=>{
  const { userId } = req.body;
  const now = new Date();
  db.query(
    'SELECT * FROM attendance WHERE userId=? AND date=?',
    [userId, now.toISOString().split('T')[0]],
    (err,results)=>{
      if(err) return res.status(500).json({error:err.message});
      if(results.length===0) return res.status(400).json({error:'Check-in first'});
      const checkIn = new Date(results[0].checkInTime);
      const hours = ((now - checkIn)/1000/3600).toFixed(2);
      let status = results[0].status;
      if(hours<4) status='half-day';
      db.query(
        'UPDATE attendance SET checkOutTime=?, totalHours=?, status=? WHERE id=?',
        [now, hours, status, results[0].id],
        (err2,result2)=>{
          if(err2) return res.status(500).json({error:err2.message});
          res.json({message:'Checked out!'});
        }
      );
    }
  );
});
router.get('/history/:id', (req, res) => {

  const userId = req.params.id;

  db.query(
    'SELECT * FROM attendance WHERE userId = ? ORDER BY date DESC',
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );

});


router.get('/dashboard/:id', (req, res) => {

  const userId = req.params.id;

  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  db.query(
    'SELECT * FROM attendance WHERE userId = ?',
    [userId],
    (err, results) => {

      if (err) return res.status(500).json({ error: err.message });

      const formattedResults = results.map(r => {
        const recordDate = new Date(r.date);
        return {
          ...r,
          formattedDate: recordDate.toISOString().split('T')[0],
          month: recordDate.getMonth(),
          year: recordDate.getFullYear()
        };
      });

     
      const todayRecord = formattedResults.find(r => r.formattedDate === today);

     
      const monthRecords = formattedResults.filter(r =>
        r.month === currentMonth && r.year === currentYear
      );

  
      const present = monthRecords.filter(r => r.status === 'present').length;
      const late = monthRecords.filter(r => r.status === 'late').length;
      const halfDay = monthRecords.filter(r => r.status === 'half-day').length;

      const totalWorkingDays = monthRecords.length;
      const absent = totalWorkingDays - present - late - halfDay;

      const totalHours = monthRecords.reduce(
        (sum, r) => sum + (parseFloat(r.totalHours) || 0),
        0
      );

        const recent = formattedResults
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 7);

      res.json({
        todayStatus: todayRecord
          ? (todayRecord.checkOutTime ? "Completed" : "Checked In")
          : "Not Checked In",
        present,
        absent,     
        late,
        totalHours: totalHours.toFixed(2),
        recent
      });

    }
  );

});


module.exports = router;
