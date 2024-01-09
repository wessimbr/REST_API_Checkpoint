const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');

dotenv.config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT;

app.use(express.json())
const User = require('./models/User')


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}}`)
})


// Connect to Database
mongoose.connect(process.env.DB_URI,).then(() => console.log("Database connected")).catch((err) => console.log(err))


//Get  Return all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Post add a new user to the database
app.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser)
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

//Put  edit a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatedUser)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete  Remove a user by ID

app.delete('/users/:id', async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        if (deleteUser) {
            res.json({ message: 'User delete successfully', deleteUser })
        }
        else {
            res.status(404).json({ message: 'User not found' })
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})