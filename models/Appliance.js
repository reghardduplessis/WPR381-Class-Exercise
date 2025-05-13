const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({
    applianceName: {
        type: String,
        required: true,
        trim: true
    },
    insuredStatus: {
        type: String,
        required: true,
        enum: ['Insured', 'Uninsured', 'Unknown']
    },
    applianceCondition: {
        type: String,
        required: true,
        enum: ['Working', 'Not Working']
    },
    applianceValue: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Appliance', applianceSchema);