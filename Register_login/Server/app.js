const express = require('express');
const mongoose = require('mongoose');
const EmployeeModel = require('./models/Employee')
const cors = require('cors')
const port = 3001
const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://localhost:27017/Employee_data")
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                } else {
                    res.json("The password is incorrect")
                }
            } else {
                res.json("This Email is not registered")
            }
        })
})


app.post('/register', async (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
})



app.listen(port, () => {
    console.log(`server is running at ${port}`)
})