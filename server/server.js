const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
const saltRounds = 10;
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
    const sql = "SELECT * FROM employees WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login error on server" });
        
        if (data.length > 0) {
            // Compare the entered password with the hcd ashed password in DB
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password check error" });
                
                if (response) {
                    const { password, image, ...userWithoutSensitiveData } = data[0];
                    return res.json({ status: "Success", user: userWithoutSensitiveData });
                } else {
                    return res.status(401).json({ status: "Error", message: "Wrong Password" });
                }
            });
        } else {
            return res.status(404).json({ status: "Error", message: "User not found" });
        }
    });
});

app.post('/add-employee', upload.single('image'), (req, res) => {
    const { name, email, password } = req.body; //
    const image = req.file ? req.file.buffer : null;
    const role = 'employee'; 

    bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });

        const sql = "INSERT INTO employees (name, email, password, image, role) VALUES (?, ?, ?, ?, ?)";
        const values = [name, email, hash, image, role]; // Use the 'hash' instead of plain password

        db.query(sql, values, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            return res.json({ status: "Success" });
        });
    });
});


app.get('/employees', (req, res) => {
    const sql = "SELECT id, name, email, image FROM employees WHERE role !='admin' OR role IS NULL";
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
    

    bcrypt.hash(password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });

        const sql = "UPDATE employees SET name = ?, password = ? WHERE id = ?";
        db.query(sql, [name, hash, id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.send({ status: "Success", message: "Profile updated successfully!" });
        });
    });
});

app.listen(5000, '0.0.0.0',() => {
    console.log("Server running on http://localhost:5000");
});
