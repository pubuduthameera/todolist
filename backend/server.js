const express = require('express');
const connectDB = require('./config/MongoDb');
const cors = require('cors');
const app = express();

const TaskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

require('dotenv').config();


connectDB();


app.use(express.json({ extended: false }));
app.use(cors(
    {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST', 'DELETE','PUT'],
        credentials: true,
    }
));



app.use('/api/auth',authController);
app.use('/api/tasks',TaskController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
