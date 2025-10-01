import express from 'express';
import cors from 'cors';
import pool from './db.js';  // db.js peab olema samas kaustas

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());            // lubab cross-origin päringuid
app.use(express.json());    // et saaks POST päringuid JSON-iga

// Test endpoint
app.get('/', (req, res) => {
  res.send('Server töötab!');
});

// POST endpoint hinnangute salvestamiseks
app.post('/api/hinnangud', async (req, res) => {
  try {
    const { subject, studentname, rating, feedback } = req.body;

    // Põhiväljade kontroll
    if (!subject || !studentname || !rating) {
      return res.status(400).send('Puuduvad vajalikud väljad');
    }

    // INSERT prepared statementiga (turvaline)
    const sql = 'INSERT INTO hinnangud (subject, studentname, rating, feedback) VALUES (?, ?, ?, ?)';
    await pool.query(sql, [subject, studentname, rating, feedback]);

    res.status(201).send('Hinnang salvestatud!');
  } catch (err) {
    console.error('Salvestuse viga:', err);
    res.status(500).send('Serveri viga');
  }
});

// Võimalus küsida kõiki hinnanguid (näiteks front-endi kuvamiseks)
app.get('/api/hinnangud', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hinnangud ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Viga andmete lugemisel:', err);
    res.status(500).send('Serveri viga');
  }
});

// Serveri käivitamine
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
