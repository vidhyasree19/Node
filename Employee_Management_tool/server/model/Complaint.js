const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }
  });
const complaint = mongoose.model('Complaint', complaintSchema); 
module.exports = complaint;