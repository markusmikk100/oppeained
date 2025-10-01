import express from 'express';
import cors from 'cors';
import pool from './db.js';  // <-- sinu andmebaasi ühendus

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // et POST päringud saaksid body lugeda

// Kontrolli, kas DB töötab
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT NOW() as now');
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('DB viga');
  }
});

// POST – hinnangu salvestamine
app.post('/api/hinnangud', async (req, res) => {
  try {
    const { subject, studentname, rating, feedback } = req.body;

    if (!subject || !studentname || !rating) {
      return res.status(400).send('Puuduvad väljad');
    }

    const sql = 'INSERT INTO hinnangud (subject, studentname, rating, feedback) VALUES (?, ?, ?, ?)';
    await pool.query(sql, [subject, studentname, rating, feedback]);

    res.status(201).send('Hinnang salvestatud!');
  } catch (err) {
    console.error('Salvestuse viga:', err);
    res.status(500).send('Serveri viga');
  }
});

// GET – kõigi hinnangute kuvamine
app.get('/api/hinnangud', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hinnangud ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Päringu viga:', err);
    res.status(500).send('Serveri viga');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
