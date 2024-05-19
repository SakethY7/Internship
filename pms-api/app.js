const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = 3000;

app.use(bodyParser.json());

// Create a new person
app.post('/persons', async (req, res) => {
  try {
    const { name, email, mobileNumber, dateOfBirth } = req.body;
    const [result] = await pool.query(
      'INSERT INTO Persons (name, email, mobileNumber, dateOfBirth) VALUES (?, ?, ?, ?)',
      [name, email, mobileNumber, dateOfBirth]
    );
    const [newPerson] = await pool.query('SELECT * FROM Persons WHERE id = ?', [result.insertId]);
    res.json(newPerson[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all persons
app.get('/persons', async (req, res) => {
  try {
    const [allPersons] = await pool.query('SELECT * FROM Persons');
    res.json(allPersons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get a person by id
app.get('/persons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [person] = await pool.query('SELECT * FROM Persons WHERE id = ?', [id]);
    if (person.length === 0) {
      return res.status(404).json({ msg: 'Person not found' });
    }
    res.json(person[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update a person
app.put('/persons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobileNumber, dateOfBirth } = req.body;
    const [result] = await pool.query(
      'UPDATE Persons SET name = ?, email = ?, mobileNumber = ?, dateOfBirth = ? WHERE id = ?',
      [name, email, mobileNumber, dateOfBirth, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Person not found' });
    }
    const [updatedPerson] = await pool.query('SELECT * FROM Persons WHERE id = ?', [id]);
    res.json(updatedPerson[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a person
app.delete('/persons/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM Persons WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Person not found' });
    }
    res.json({ msg: 'Person was deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
