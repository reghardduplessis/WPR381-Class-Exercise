// app.js
//imports and initializing values
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const PORT = 3000;
const HOST = "localhost";
const dbURL = `mongodb://${HOST}/recordsDB`; 
const pageRoutes = require("./routes/pageRoutes");

//setting used modules
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//database connection
mongoose.connect(dbURL);
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});
mongoose.connection.on("error", (err) => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

app.use("/", pageRoutes);

app.listen(PORT, HOST,() => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

/*
const Record = mongoose.model('Record', RecordSchema);

// Add a new record
app.post('/add', async (req, res) => {
  try {
    const newRecord = new Record(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// View all records
app.get('/view', async (req, res) => {
  try {
    const records = await Record.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View single record by ID
app.get('/view/:id', async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update record by ID
app.put('/update/:id', async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRecord) return res.status(404).json({ error: 'Record not found' });
    res.json(updatedRecord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete record by ID
app.delete('/delete/:id', async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.id);
    if (!deletedRecord) return res.status(404).json({ error: 'Record not found' });
    res.json({ message: 'Record deleted', record: deletedRecord });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

*/