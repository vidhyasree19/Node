const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 4000;
const User = require('./model/User');
const Employee = require('./model/Employee')
const Complaint = require('./model/Complaint')
const authController = require('./Controllers/auth');
const cors = require('cors');
const seeder = require('./Data/users');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Employee_Management")
  .then(() => console.log("Database Connected"))
  .catch(() => console.log("Error Connecting"));

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = authController.generateToken(user);
  const data = {
    token: token,
    role: user.role
  }
  res.json(data);
});
app.get('/api/user/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/api/users', (req, res) => {
  console.log('Route handler called');
  const { email } = req.body;
  const user = new User({email,password});
  user.save().then((savedUser) => {
    res.send(savedUser);
  }).catch((err) => {
    res.status(500).send(err);
  });
});

app.post('/api/employees', (req, res) => {
  console.log('Route handler called');
  const { name, email, department, team, role, manager } = req.body;
  const employee = new Employee({ name, email, department, team, role, manager });
  employee.save().then((savedEmployee) => {
    res.send(savedEmployee);
  }).catch((err) => {
    res.status(500).send(err);
  });
});
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
});
app.put('/api/employees/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating employee' });
  }
});

app.post('/api/employees/:id/projects', async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById(id);
    employee.projects.push(req.body.project);
    await employee.save();
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error allocating project' });
  }
});

app.patch('/api/employees/:id/performance', async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findById(id);
    employee.performanceScore = req.body.performanceScore;
    await employee.save();
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating performance score' });
  }
});
app.delete('/api/employees/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await Employee.findByIdAndRemove(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error removing employee' });
  }
});
const complaints = [];

app.post('/employee/complaints', async (req, res) => {
  const { title, description, raisedBy } = req.body;
  const newComplaint = new Complaint({ title, description, status: 'Open', raisedBy });
  try {
    const savedComplaint = await newComplaint.save();
    res.status(201).send(savedComplaint);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error creating complaint' });
  }
});
app.get('/employee/complaints/all', async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('raisedBy').exec();
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching complaints' });
  }
});
seeder.seed().then(() => {
  User.findOne({ username: 'admin' }).then((adminUser) => {
    if (adminUser) {
      const secretKey = 'your_secret_key_here';
      const adminToken = authController.generateToken(adminUser, secretKey);
      console.log(`Admin token: ${adminToken}`);
    } else {
      console.log('Admin user not found');
    }
  });

  User.findOne({ username: 'employee' }).then((employeeUser) => {
    if (employeeUser) {
      const secretKey = 'your_secret_key_here';
      const employeeToken = authController.generateToken(employeeUser, secretKey);
      console.log(`Employee token: ${employeeToken}`);
    } else {
      console.log('Employee user not found');
    }
  });
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});
