const express = require("express");
const app = express();
const path = require("path");
const sqlite3 = require("sqlite3").verbose(); // Fixed: Uncommmented this line
// const fs = require("fs");

const db = new sqlite3.Database("data.db");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname)));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use(express.static(path.join(__dirname, "style")));
app.use(express.static(path.join(__dirname, "JS")));

// View Engine Setup
const port = 8080;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- Routes ---

// Home Route
app.get("/", (req, res) => {
  res.render("home", { 
    title: "My Portfolio Home", 
    username: "Arun", 
    message: "Welcome to my clean EJS home page!" 
  });  
});

// Data Route
app.get("/data", (req, res) => {
  db.all("SELECT * FROM images", (err, rows) => {
    if (err) return res.status(500).send("Database Error fetching images");
    res.render("page", { rows });
  });
});

// Media Routes
app.get('/media', (req, res) => {
  res.render('media', { section: 'overview' });
});

app.get('/media/:section', (req, res) => {
  const section = req.params.section;
  res.render('media', { section });
});

// Plan Routes
app.get('/plan', (req, res) => res.render('plan'));

app.get('/plan/:section', (req, res) => {
  const section = req.params.section;
  res.render('plan', { section });
});

// Book Routes
app.get('/book/:section', (req, res) => {
  const section = req.params.section;
  res.render('book', { section });
});

// Admin Route
app.get('/admin', (req, res) => {
  res.render('admin', { message: null }); // Fixed: Removed the duplicate /admin route below
});

// Other Routes
  app.get('/experiences', (req, res) => res.render('experiences'));
app.get('/search', (req, res) => res.render('search'));

// Start Server
app.listen(port, () => {
  console.log(`Express port ${port}`);
  console.log(`http://localhost:${port}`);
});