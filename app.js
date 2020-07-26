const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const database=require('./models/index');
const user=require('./models/user');

const app = express();
const sessionStore=new SequelizeStore({
    db:database.sequelize
})

const userRoutes = require('./routes/user');
const authRoutes = require('./routes/authRoutes');
//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

// sessionStore.sync();

app.use('/user', userRoutes);
app.use('/auth', authRoutes);




app.listen(3000);
