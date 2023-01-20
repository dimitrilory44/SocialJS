const express = require('express');
const app = express();
const { sequelize } = require('./models/index');
const path = require('path');
const winston = require('./middleware/log');
const morgan = require('morgan');

const helmet = require('helmet');

const routeAuth = require('./routes/auth');
const routeUser = require('./routes/user');
const routePost = require('./routes/post');

require('dotenv').config();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'),
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'),
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'),
    next();
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(helmet());

// Nous utilisons morgan pour enregistrer notre transformation express
app.use(morgan('combined', { stream: winston.stream }));

app.use('/images', express.static(path.join(__dirname, 'images')));

const testConnectionDB = async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection with mySQL has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };

testConnectionDB();

app.get('/api', (req, res) => {
  res.json({title: 'Bienvenue sur mon API REST Groupomania'});
});

// Authentification de l'utilisateur
app.use('/api/auth', routeAuth);

// Recupération des users pour l'administration
app.use('/api/users', routeUser);

// Recupération des posts
app.use('/api/posts', routePost);

module.exports = app;