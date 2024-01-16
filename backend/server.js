const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const { EmployeModel } = require('./models/employe');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/bikiniDb');


app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await EmployeModel.findOne({ email: email.toLowerCase() });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                res.json('success');
            } else {
                res.json('password incorrect');
            }
        } else {
            res.json('record does not exist');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = await EmployeModel.create({ email, password: hashedPassword });
        res.json(newEmployee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});
