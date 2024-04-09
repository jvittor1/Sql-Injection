const express = require('express');
const app = express();
const db = require('sqlite3').verbose();
var cors = require('cors');
app.use(express.json());
app.use(cors());


// Database
const dbConnection = new db.Database('./db.sqlite', (err) => {
  if (err) {
    console.error('Error while connecting to database', err.message);
  } else {
    console.log('Connected to database');
  }
});

// Create table
dbConnection.serialize(() => {
  dbConnection.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT not null, login TEXT not null, email TEXT UNIQUE not null, password TEXT not null)");
});


// Create user
app.post('/createUser', (req, res) => {
  const { name, email, password, login } = req.body;
  const sqlInjectionPrevention = /^[a-zA-Z0-9@#&.$_\s]+$/;

  if(!name.match(sqlInjectionPrevention) || !email.match(sqlInjectionPrevention) || !password.match(sqlInjectionPrevention) || !login.match(sqlInjectionPrevention)){
    console.log('Invalid characters detected!');
    return res.status(400).json({ err: "Invalid characters detected!')"})
  }

  dbConnection.run('INSERT INTO users (name, login, email, password) VALUES (?, ?, ?, ?)', [name, login, email, password], (err) => {
    if (err) {
      res.status(400).send('Error while inserting user');
      console.log('Error while inserting user', err);
      console.log(name, login, email, password);
    } else {
      res.status(204).send();
      console.log('User inserted successfully');
      console.log(name, login, email, password);
    }
  });

});


// Get user
app.post('/user', (req, res) => {
  const { login, password, sqlInjection } = req.body;
  const sqlInjectionPrevention = /^[a-zA-Z0-9@#&.$_]+$/;
  var sql;
  var params;

  if (sqlInjection) {
    sql = `SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`;
    params = [];
  }

  else{
    
    if(!login.match(sqlInjectionPrevention) || !password.match(sqlInjectionPrevention)){
      console.log('SQL Injection detected!');
      return res.status(400).json({ err: "SQL Injection detected!"})
    }

    sql = `SELECT * FROM users WHERE login = ? AND password = ?`;
    params = [login, password];

  } 


  dbConnection.all(sql, params, (err, row) => {
    if (err) {
      res.status(400).send('Error while searching for user');
      console.log('Error while searching for user', err);
    } else {
      if (row && row.length > 0) {
        res.status(200).send(row);
        console.log('User found', row);
      } else {
        res.status(404).send('User not found');
        console.log('User not found');
      }
    }
  });

  
});



app.listen(3000, () => {
  console.log('Server running on port 3000');
});
