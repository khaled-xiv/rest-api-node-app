const express = require('express');
const bodyParser = require('body-parser');
const config=require('./config/config.json');

const app = express();

const authRoutes = require('./routes/authRoutes');

app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-origin','*');
    res.setHeader('Access-Control-Allow-Methods','Get,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
})

app.use('/api/auth', authRoutes);

const server= app.listen(config.port);
const io=require('socket.io')(server);
