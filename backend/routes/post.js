const express = require('express');
const routes = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

/**************** POST ************************/

// création d'un post
routes.post('/', auth, multer, postCtrl.createPost);

// Affichage de tous les posts
routes.get('/', auth, postCtrl.getAllPost);

// Affichage d'un post
routes.get('/:id', auth, postCtrl.getOnePost);

// Modification d'un post
routes.put('/:id', auth, multer, postCtrl.updatePost);

// Suppression d'un post
routes.delete('/:id', auth, postCtrl.deletePost);

// liker un post
routes.post('/:id/likes', auth, postCtrl.likeOrNot);

// Recupérer les likes d'un post
routes.get('/:id/likes', auth, postCtrl.getLikesPost);

/**************** COMMENT *********************/

// creation d'un commentaire
routes.post('/:id/comments', auth, postCtrl.createComment);

// Avoir un commentaire
routes.get('/:idPost/comments/:idComment', auth, postCtrl.getOneComment);

// Avoir tous les commentaires
routes.get('/:id/comments', auth, postCtrl.getAllComment);

// Modifier un commentaire
routes.put('/:idPost/comments/:idComment', auth, postCtrl.updateComment);

// Supprimer un commentaire
routes.delete('/:idPost/comments/:idComment', auth, postCtrl.deleteComment);

module.exports = routes;