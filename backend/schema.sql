-- schema.sql
-- Creates the 'oppeained' database, user, and the table 'hinnangud'

-- 1. Create the database
CREATE DATABASE IF NOT EXISTS oppeained CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Use it
USE oppeained;

-- 3. Create a user (if not already created)
CREATE USER IF NOT EXISTS 'koolikasutaja'@'localhost' IDENTIFIED BY 'ttrrop';

-- 4. Grant privileges to that user on the database
GRANT ALL PRIVILEGES ON oppeained.* TO 'koolikasutaja'@'localhost';
FLUSH PRIVILEGES;

-- 5. Create the table for storing ratings / feedback
CREATE TABLE IF NOT EXISTS hinnangud (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100) NOT NULL,
  studentname VARCHAR(100) NOT NULL,
  rating INT NOT NULL,
  feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Optional test query
SELECT * FROM hinnangud;
