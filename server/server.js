// This is considered boilerplate for server setup and can be copy and pasted into projects //
import Database from "better-sqlite3";
import express from "express";
import cors from "cors";

const db = new Database("database.db");
const app = express();

app.use(express.json());
app.use(cors());

// This starts/creates the server. The console log confirms the server is running upon executing "node server" //
app.listen(8080, function () {
  console.log("Congratulations, you just hacked the mainframe.");
});

// This is creating the homepage of the API endpoint //
app.get("/", function (request, response) {
  response.json("This is a response from the server");
});

// This creates a new endpoint called /marketplacelistings, creates a new variable and saving within that variable
// all (*) of the values from our database called marketplacelistings. The GET request enables the API to recieve/go and GET
// data from the database. //
app.get("/marketplacelistings", function (request, response) {
  const marketplaceListings = db
    .prepare("SELECT * FROM marketplacelistings")
    .all();
  response.json(marketplaceListings);
});

// This POST request updates the database with what was added to the form. It creates two variables
// called username and message where the values are equal to those in the body of the request.
app.post("/marketplacelistings", function (request, response) {
  const title = request.body.title;
  const price = request.body.price;
  const condition = request.body.condition;
  const description = request.body.description;
  // We then use SQL to insert the username and message values into the "messages" database.
  // The values are question marks to prevent SQL injection.
  const newListing = db
    .prepare(
      `INSERT INTO marketplacelistings (title, price, condition, description) VALUES (?, ?, ?, ?)`
    )
    .run(title, price, condition, description);
  response.json("listing created");
});

app.delete("/marketplacelistings/:id", function (request, response) {
  const id = request.params.id;
  db.prepare(`DELETE FROM marketplacelistings WHERE id = ?`).run(id);
  response.json("Successfully Deleted");
});

app.get("/user", (req, res) => {
  let user = [];

  if (req.query.id) {
    user = db.prepare(`SELECT * FROM user WHERE id=${req.query.id}`).all();
  } else {
    user = db.prepare("SELECT * FROM user").all();
  }

  res.json(user);
});

app.post("/user", async (req, res) => {
  const { userName, email } = req.body;

  const newUser = db
    .prepare(`INSERT INTO user (userName, email) VALUES (?, ?)`)
    .run(userName, email);
  res.json(newUser);
});

app.get("/collection", (req, res) => {
  let collection = [];

  if (req.query.id) {
    collection = db
      .prepare(`SELECT * FROM collection WHERE id=${req.query.id}`)
      .all();
  } else {
    collection = db.prepare("SELECT * FROM collection").all();
  }

  res.json(collection);
  console.log(res.json(collection));
});

app.post("/collection", (req, res) => {
  const {
    user_id,
    item_name,
    bought_date,
    condition,
    bought_price,
    description,
  } = req.body;

  console.log("bodybodybpdy", req.body);

  const newCollection = db
    .prepare(
      `INSERT INTO collection (user_id, item_name, bought_date, condition, bought_price, description ) VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(user_id, item_name, bought_date, condition, bought_price, description);
  res.json(newCollection);
});
