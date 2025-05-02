const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// Create an Express app
const app = express();

// Use CORS middleware to allow requests from other origins (like React app)
app.use(cors());

// Middleware to parse JSON data from request body
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: '127.0.0.1',  // MySQL server hostname
    user: 'viraj',       // Your MySQL username
    password: '',       // Your MySQL password
    database: 'react-crud'    // Your database name
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Route to handle POST request for inserting data
app.post('/insert', (req, res) => {
    const { name, email, password } = req.body;

    // Insert user data into the 'users' table
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, results) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ message: 'Error inserting data' });
        }

        res.json({
            message: 'User data saved successfully!',
            data: { name, email, password }
        });
    });
});


app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching users' });
        }
        res.json(results);
    });
});


app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(results[0]);
    });
  });
  
  app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, password, id],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Update failed" });
        }
        res.json({ message: "User updated successfully" });
      }
    );
  });

  
  app.delete("/users/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
      if (err) {
        return res.status(500).json({ message: "Delete failed" });
      }
      res.json({ message: "User deleted successfully" });
    });
  });
  


// Start the server on port 8000
app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});
