const db = require('../models');
const { User, Post, Comment, Like_post } = db.sequelize.models;
const fs = require('fs');

/*********************** POST ********************************/

exports.createPost = (req, res) => {
    const postObject = JSON.parse(req.body.post);
    const newPost = req.file ? {
        ...postObject,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...postObject};
    Post.create(newPost)
    .then(() => res.status(201).json({message: 'Post crée !'}))
    .catch(error => res.status(400).json(error));
};

exports.getAllPost = (req, res) => {
    Post.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: User,
                attributes: ['nom', 'prenom', 'image'],
                required: true
            }, {
                model: Comment,
                attributes: ['id', 'contenu', 'createdAt', 'updatedAt'],
                include: [{model: User, attributes: ['id', 'nom', 'prenom', 'image']}],
                required: false
            }, {
                model: Like_post,
                attributes: ['createdAt', 'updatedAt', 'isLike'],
                include: [{model: User, attributes: ['id', 'nom', 'prenom', 'image']}],
                required: false
            }

        ],
        attributes: ['id', 'UserId', 'image', 'contenu', 'createdAt', 'updatedAt']
    })
    .then(posts => res.status(200).json(posts))
    .catch(error => res.status(400).json(error));
};

exports.getOnePost = (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['nom', 'prenom', 'image'],
                required: true
            }, {
                model: Comment,
                attributes: ['id', 'contenu', 'createdAt', 'updatedAt'],
                include: [{model: User, attributes: ['nom', 'prenom', 'image']}],
                required: false
            }, {
                model: Like_post,
                attributes: ['createdAt', 'updatedAt', 'isLike'],
                include: [{model: User, attributes: ['id', 'nom', 'prenom', 'image']}],
                required: false
            }

        ],
        attributes: ['id', 'UserId', 'contenu', 'image', 'createdAt', 'updatedAt']
    })
    .then(post => res.status(200).json(post))
    .catch(error => res.status(400).json(error));
};

exports.updatePost = (req, res) => {
    const postObject = req.file ? {
        contenu: req.body.contenu,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    Post.update(postObject, {
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(201).json({message: 'Post modifié !'}))
    .catch(error => res.status(400).json(error));
};

exports.deletePost = (req, res) => {
    Post.findOne({where: {id: req.params.id}})
    .then(my_post => {
        const filename = my_post.image.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Post.destroy({where: {id: req.params.id}})
            .then(() => res.status(200).json({message: "Post supprimé !"}))
            .catch(error => res.status(400).json(error));
        });
    })
    .catch(error => res.status(400).json(error));
};

exports.likeOrNot = (req, res) => {
    if(req.body.like == 1) {
        const like = {
            isLike: req.body.like,
            UserId: req.body.userId,
            PostId: req.params.id
        };
        Like_post.create(like)
        .then(() => res.status(201).json({message: 'Utilisateur a liké !'}))
        .catch(error => res.status(400).json({error}));
    } else if(req.body.like == 0){
        Like_post.destroy({
            where: {
                UserId: req.body.userId,
                PostId: req.params.id
            }
        })
        .then(() => res.status(201).json({message: 'Utilisateur a enlevé son like !'}))
        .catch(error => res.status(400).json({error}));
    } else {
        return res.status(400).json({error : 'Attention pas de like supérieur à 1'});
    }
};

exports.getLikesPost = (req, res) => {
    Like_post.findAll({
        include: [
            {
                model: User,
                attributes: ['nom', 'prenom', 'image']
            }
        ],
        where: {
            PostId: req.params.id
        }
    })
    .then(postLike => res.status(200).json(postLike))
    .catch(error => res.status(400).json(error));
};

/*********************** COMMENT ********************************/

exports.createComment = (req, res) => {
    const newComment = {
        contenu: req.body.contenu,
        UserId: req.body.UserId,
        PostId: req.params.id
    };
    Comment.create(newComment)
    .then(() => res.status(201).json({message: 'Commentaire crée !'}))
    .catch(error => res.status(400).json(error));
};

exports.getOneComment = (req, res) => {
    Comment.findOne({
        where: {
            id: req.params.idComment,
            PostId: req.params.idPost
        }
    })
    .then(comment => res.status(200).json(comment))
    .catch(error => res.status(400).json(error));
}

exports.getAllComment = (req, res) => {
    Comment.findAll({
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'nom', 'prenom', 'image'],
                required: true
            }
        ],
        where: {
            PostId: req.params.id
        },
        attributes: ['id', 'UserId', 'contenu', 'createdAt', 'updatedAt']
    })
    .then(comments => res.status(201).json(comments))
    .catch(error => res.status(400).json(error));
};

exports.updateComment = (req, res) => {
    Comment.update({
        contenu: req.body.contenu
    }, {
        where: {
            id: req.params.idComment,
            PostId: req.params.idPost
        }
    })
    .then(() => res.status(201).json({message: 'Commentaire modifié !'}))
    .catch(error => res.status(400).json(error));
};

exports.deleteComment = (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.idComment,
            PostId: req.params.idPost
        }
    })
    .then(() => res.status(200).json({message: "Commentaire supprimé !"}))
    .catch(error => res.status(400).json(error));
};