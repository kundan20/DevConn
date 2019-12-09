const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect DB
connectDB();

//Init middleware
app.use(express.json({extended: false}));

app.get('/', (req,res) => res.send(`Ohooo, API is running...`));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profiles'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

