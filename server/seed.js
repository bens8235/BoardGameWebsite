// The below creates the database by first importing it from the "better-sqlite3" module
// It then saves this new database as a module

import Database from "better-sqlite3";
const db = new Database("database.db");

// This creates the table in which our data will be stored. "IF NOT EXISTS" is important to add to that
// it doesn't try and recreate the table everytime.
// As many columns as we need can be added here with the value it requires. INT is used for numbers.
// Everything written in the brackets is SQL.

db.exec(`CREATE TABLE IF NOT EXISTS marketplacelistings(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    price INTEGER,
    condition TEXT,
    description TEXT
)`);

// Create user table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL
  )
`
).run();

// Create collection table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS collection (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    item_name TEXT NOT NULL,
    bought_date DATE NOT NULL,
    condition TEXT NOT NULL,
    bought_price REAL NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id)
  )
`
).run();

// Insert a user
const insertUser = db.prepare(
  `INSERT INTO user (username, email) VALUES (?, ?)`
);
insertUser.run("john", "john@gmail.com");

// Insert an item to the collection table
const insertItem = db.prepare(`
  INSERT INTO collection (user_id, item_name, bought_date, condition, bought_price, description)
  VALUES (?, ?, ?, ?, ?, ?)
`);
insertItem.run(1, "Example Item", "2023-02-12", "good", 29.0, " ");

// close the database connection when done
db.close();

// The below statement is pushed to the database manually by me but are not a requirement.
// If they were not here the database would simply be empty when we load up the client.

// db.exec(`
//     INSERT INTO marketplacelistings (title, price, condition, description)
//     VALUES
//     ('Kelp', '35', 'New', 'Brand new, still wrapped')
// `);
