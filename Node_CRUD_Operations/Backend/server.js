const express = require('express');

const cors = require('cors')

const app = express()
const DataModel = require('./models/Data')
app.use(express.json())
app.use(cors())




app.get('/', async (req, res) => {
    const users = await DataModel.find({});
    res.json(users);

})



app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber } = req.body;
        const newUser = new DataModel({ firstName, lastName, email, mobileNumber });
        await newUser.save();
        res.status(200).json({ message: "User Created" });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.put('/register/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await DataModel.findByIdAndUpdate(id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: `cannot find any user with ID ${id}` })
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.delete('/register/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await DataModel.findByIdAndDelete(id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: `cannot find any user with ID ${id}` })
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = app;


