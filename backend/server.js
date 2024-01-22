const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { EmployeModel } = require('./models/employe');
const { ItemsModel } = require('./models/recipeModel');

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/bikiniDb')
    .then(() => {
        console.log('MongoDB Connected!');
    })
    .catch((error) => {
        console.error('MongoDB Connection Error:', error);
    });

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, 'mySkey', (err, decoded) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await EmployeModel.findOne({ email: email.toLowerCase() });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                // Generate JWT
                const token = jwt.sign({ userId: user._id, email: user.email }, 'your-secret-key');

                // Set the JWT as a cookie (optional)
                res.cookie('jwt', token, { httpOnly: true });

                // Respond with user details and token
                res.json({
                    success: true,
                    user: { userId: user._id, email: user.email },
                    token
                });
            } else {
                res.json({ success: false, message: 'Password incorrect' });
            }
        } else {
            res.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newEmployee = await EmployeModel.create({ email, password: hashedPassword });

        // Generate JWT for the newly registered user
        const token = jwt.sign({ email: newEmployee.email }, 'mySkey');
        
        // Set the JWT as a cookie (optional)
        res.cookie('jwt', token, { httpOnly: true });
        res.json({
            success: true,
            user: { email: newEmployee.email },
            token
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// Example protected route using JWT authentication
app.get('/getItems', verifyToken, (req, res) => {
    ItemsModel.find()
        .then(items => res.json(items))
        .catch(err => {
            console.error('Error fetching items:', err);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is live on port ${PORT}`);
});
