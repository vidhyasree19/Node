const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 4000;
const User = require('./model/User');
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
  res.json({ token });
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