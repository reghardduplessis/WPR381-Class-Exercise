# WPR381-Class-Exercise
Proof of concept for an application that requires details to be entered, then displays that information for insurance companies.

GPT:
Folder structure:
appliance-insurance-app/
│
├── config/
│   └── db.js                  // Database connection setup
│
├── controllers/
│   └── applianceController.js // Logic for each route
│
├── models/
│   └── Appliance.js           // Mongoose schema and model
│
├── routes/
│   └── applianceRoutes.js     // Route definitions
│
├── .env                       // Store Mongo URI, PORT
├── .gitignore                 // Ignore node_modules, .env, etc.
├── server.js                 // App entry point
└── package.json

Install dependencies:
npm init -y
npm install express mongoose dotenv

.env:
PORT=5000
MONGO_URI=mongodb://localhost:27017/appliances

config/db.js:
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;

models/Appliance.js:
const mongoose = require("mongoose");

const applianceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2
  },
  model: {
    type: String,
    required: true
  },
  dateOfDamage: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true,
    min: 0
  },
  owner: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Appliance", applianceSchema);

controllers/applianceController.js:
const Appliance = require("../models/Appliance");

// Add a new record
exports.addAppliance = async (req, res) => {
  try {
    const appliance = new Appliance(req.body);
    await appliance.save();
    res.status(201).json(appliance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// View all records
exports.viewAll = async (req, res) => {
  try {
    const appliances = await Appliance.find();
    res.json(appliances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View single record
exports.viewOne = async (req, res) => {
  try {
    const appliance = await Appliance.findById(req.params.id);
    if (!appliance) return res.status(404).json({ message: "Not found" });
    res.json(appliance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update single record
exports.updateAppliance = async (req, res) => {
  try {
    const appliance = await Appliance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!appliance) return res.status(404).json({ message: "Not found" });
    res.json(appliance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete record
exports.deleteAppliance = async (req, res) => {
  try {
    const appliance = await Appliance.findByIdAndDelete(req.params.id);
    if (!appliance) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

routes/applianceRoutes.js:
const express = require("express");
const router = express.Router();
const controller = require("../controllers/applianceController");

router.post("/add", controller.addAppliance);
router.get("/view", controller.viewAll);
router.get("/view/:id", controller.viewOne);
router.put("/update/:id", controller.updateAppliance);
router.delete("/delete/:id", controller.deleteAppliance);

module.exports = router;

server.js:
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const applianceRoutes = require("./routes/applianceRoutes");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();
app.use(bodyParser.json());

app.use("/", applianceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

.gitignore:
node_modules
.env


