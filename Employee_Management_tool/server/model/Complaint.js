const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    employeeId: String,
    description: String,
    status: String 
});
const complaint = mongoose.model('Complaint', complaintSchema); 
module.exports = complaint;