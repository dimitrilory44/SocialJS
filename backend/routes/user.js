const express = require('express');
const routes = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

// Information tous les utilisateurs
routes.get('/', auth, userCtrl.getAllUser);

// Information 1 utilisateur
routes.get('/:id', auth, userCtrl.getOneUser);

// Modifier information utilisateur
routes.put('/:id', auth, multer, userCtrl.updateUser);

// Supprimer 1 utilisateur
routes.delete('/:id', auth, userCtrl.deleteUser);

// Post par utilisateur
routes.get('/:id/posts', auth, userCtrl.getPostByUser);

module.exports = routes;