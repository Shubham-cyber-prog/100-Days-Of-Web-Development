/**
 * Sample Database Schema & Seed Data
 */

export const SAMPLE_DATA = `
-- Create tables
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    role TEXT NOT NULL,
    joined_at DATE DEFAULT (datetime('now','localtime'))
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    amount DECIMAL(10,2),
    status TEXT,
    order_date DATE,
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    name TEXT,
    price DECIMAL(10,2),
    stock INTEGER
);

-- Seed data
INSERT INTO users (name, email, role) VALUES 
('Alice Smith', 'alice@example.com', 'Admin'),
('Bob Johnson', 'bob@example.com', 'User'),
('Charlie Brown', 'charlie@example.com', 'Manager'),
('Diana Prince', 'diana@example.com', 'User'),
('Edward Norton', 'edward@example.com', 'User');

INSERT INTO products (name, price, stock) VALUES 
('Laptop Pro', 1299.99, 15),
('Smartphone X', 899.50, 42),
('Wireless Mouse', 25.00, 156),
('Desk Lamp', 45.99, 8),
('Keyboard Mech', 120.00, 30);

INSERT INTO orders (user_id, amount, status, order_date) VALUES 
(1, 1299.99, 'Delivered', '2023-11-15'),
(2, 25.00, 'Shipped', '2023-11-16'),
(1, 45.99, 'Pending', '2023-11-17'),
(4, 899.50, 'Processing', '2023-11-17'),
(2, 120.00, 'Delivered', '2023-11-18');
`;
