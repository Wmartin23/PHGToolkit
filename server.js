// server.js
const express = require('express');
const odbc = require('odbc');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Allow requests from your HTML

const connectionString = 'DSN=1CCHGLDB;Trusted_Connection=yes;';

app.get('/data', async (req, res) => {
  let connection;
  try {
    connection = await odbc.connect(connectionString);

    // Query the top 10 rows from the query/view CCHGLDBQRY1
    const sql = 'SELECT TOP 10 * FROM CCHGLDBQRY1';
    const result = await connection.query(sql);

    res.json(result);
  } catch (err) {
    console.error('ODBC error:', err);
    res.status(500).send('Database connection error');
  } finally {
    if (connection) await connection.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
