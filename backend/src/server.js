const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');
const mongoConnect = require('./config/mongoDbconfig');
const { validateUser } = require('./dto/userValidator');
require('dotenv').config();


// Initialize express
const app = express();
const PORT = process.env.PORT;



// Middleware for CORS and JSON parsing
const corsOptions = {
    origin: 'https://3dsys-user-management.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());



// Connect to MongoDB
mongoConnect();


//server start
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



//all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/users', async (req, res) => {
    const { error } = validateUser(req.body); // Validate request body
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = new User(req.body);
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
    const { error } = validateUser(req.body); // Validate request body
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//delete user
app.delete('/api/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});