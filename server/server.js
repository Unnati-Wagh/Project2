const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL Database!');
});

const upload = multer({ storage: multer.memoryStorage() });

app.get('/', (req, res) => {
    res.send("Server is running!");
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT id, name, email, role FROM employees WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (result.length > 0) {
 
            res.send({ status: "Success", user: result[0] });
        } else {
            res.status(401).send({ message: "Wrong email or password" });
        }
    });
});

app.post('/add-employee', upload.single('image'), (req, res) => {
    const { name, email, password } = req.body; //
    const imageData = req.file ? req.file.buffer : null;
    const role = 'employee'; 

    const sql = "INSERT INTO employees (name, email, password, image, role) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, email, password, imageData, role], (err, result) => {
        if (err) return res.status(500).json({ error: "Email already exists or DB error" });
        res.send({ message: "Employee registered successfully!" });
    });
});


app.get('/employees', (req, res) => {
    const sql = "SELECT id, name, email, image FROM employees";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.delete('/delete-employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employees WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.send({ message: "Employee deleted successfully!" });
    });
});

app.put('/update-employee/:id', (req, res) => {
    const { name, password } = req.body;
    const id = req.params.id;
    
    const sql = "UPDATE employees SET name = ?, password = ? WHERE id = ?";
    db.query(sql, [name, password, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.send({ status: "Success", message: "Profile updated successfully!" });
    });
});

app.listen(5000, '0.0.0.0',() => {
    console.log("Server running on http://localhost:5000");
});
