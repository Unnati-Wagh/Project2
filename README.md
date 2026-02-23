while cloning this repo , the node_modules won't be there. simply run:

npm install inside the server folder.

npm install inside the client folder.

This reads your package.json and downloads exactly what is needed without bloat.

====================================================================================
About the .env File

create a .env in server and add your database configurations

===========================================================================
To start the react app run - npm start in client 
To start the server run - node server.js in server

=====================================================
create a mysql table employees in employeedatabase
use employeedatabase;
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    image LONGBLOB
);

-- Add password and role columns to your existing table
ALTER TABLE employees 
ADD COLUMN password VARCHAR(255) NOT NULL,
ADD COLUMN role ENUM('admin', 'employee') DEFAULT 'employee';

INSERT INTO employees (name, email, password, role) 
VALUES ('System Admin', 'admin@mail.com', 'admin123', 'admin');

