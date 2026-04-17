const mysql = require('mysql2/promise');
const express = require('express');
const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'mydb'
};

app.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT VERSION() as version');
    await connection.end();
    res.send(`<h1>Connected to MySQL!</h1><p>MySQL Version: ${rows[0].version}</p>`);
  } catch (error) {
    res.status(500).send(`<h1>Error connecting to MySQL</h1><pre>${error.message}</pre>`);
  }
});

app.listen(port, () => {
  console.log(`Node app listening at http://localhost:${port}`);
});
