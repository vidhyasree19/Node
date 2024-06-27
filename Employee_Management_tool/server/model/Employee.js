const mongoose= require('mongoose')

const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    project: String,
    employeeId: String
  });
  
const Employee = mongoose.model('Employee', employeeSchema); 
module.exports=Employee;
