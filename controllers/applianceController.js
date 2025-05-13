const Appliance = require('../models/Appliance');

// Add a new appliance
exports.addAppliance = async (req, res) => {
    try {
        const appliance = new Appliance(req.body);
        await appliance.save();
        res.status(201).json(appliance);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// View all appliances
exports.viewAll = async (req, res) => {
    const appliances = await Appliance.find();
    res.json(appliances);
};

// View single appliance
exports.viewOne = async (req, res) => {
    try {
        const appliance = await Appliance.findById(req.params.id);
        if (!appliance) return res.status(404).json({ error: 'Not found' });
        res.json(appliance);
    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
};

// Update appliance
exports.updateAppliance = async (req, res) => {
    try {
        const appliance = await Appliance.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!appliance) return res.status(404).json({ error: 'Not found' });
        res.json(appliance);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete appliance
exports.deleteAppliance = async (req, res) => {
    try {
        const appliance = await Appliance.findByIdAndDelete(req.params.id);
        if (!appliance) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted successfully' });
    } catch {
        res.status(400).json({ error: 'Invalid ID' });
    }
};