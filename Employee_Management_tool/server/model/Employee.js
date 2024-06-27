
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  team: String,
  role: String,
  manager: String
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;