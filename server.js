const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect DB
connectDB();

//Init middleware
app.use(express.json({extended: false}));

// app.get('/', (req,res) => res.send(`Ohooo, API is running...`));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profiles'));

//serve static files
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

