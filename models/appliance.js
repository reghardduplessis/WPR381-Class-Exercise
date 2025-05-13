const mongoose = require('mongoose');

// Define schema and model
const ApplianceRecordSchema = new mongoose.Schema({
    applicationName: { type: String, required: true },
    insuredStatus: { type: String, required: true },
    applicationCondition: { type: String, required: true },
    applianceValue: { type: Number, required: true,default: 0 }
});

modules.exports = mongoose.model('ApplianceRecord', RecordSchema);