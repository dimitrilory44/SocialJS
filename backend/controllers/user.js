const db = require('../models');
const { User, Post, Comment, Like_post } = db.sequelize.models;
const fs = require('fs');

exports.getAllUser = (req, res) => {
    User.findAll({
        where: {
            isAdmin: 0
        },
        attributes: ['id','email', 'nom', 'prenom', 'image', 'telephone']
    })
    .then(users => res.status(200).json(users))
    .catch(error => res.status(400).json(error))
};

exports.getOneUser = (req, res) => {
    User.findOne({where: {id: req.params.id}})
    .then(user => {
        res.status(200).json({
            userId: user.id,
            email: user.email,
            nom: user.nom,
            prenom: user.prenom,
            image: user.image,
            telephone: user.telephone,
            isAdmin: user.isAdmin 
        })
    }).catch(error => res.status(400).json(error));
};

exports.updateUser = (req, res) => {
    User.findOne({where: {id: req.params.id}})
    .then(my_user => {
        if(my_user.image) {
            const filename = my_user.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                const user = JSON.parse(req.body.user);
                const userObject = req.file ? {
                    ...user,
                    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
                } : {...user};
                User.update(userObject, {
                    where: {
                        id: req.params.id
                    }
                })
                .then(() => res.status(201).json({message: 'Utilisateur modifié !'}))
                .catch(error => res.status(400).json(error));
            });
        }
        const user = JSON.parse(req.body.user);
        const userObject = req.file ? {
            ...user,
            image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : {...user};
        User.update(userObject, {
            where: {
                id: req.params.id
            }
        })
        .then(() => res.status(201).json({message: 'Utilisateur modifié !'}))
        .catch(error => res.status(400).json(error));
    })
    .catch(error => res.status(400).json(error));
};

exports.deleteUser = (req, res) => {
    User.findOne({where: {id: req.params.id}})
    .then(my_user => {
        if(my_user.image) {
            const filename = my_user.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                User.destroy({where: {id: req.params.id}})
                .then(() => res.status(200).json({message: "Utilisateur supprimé !"}))
                .catch(error => res.status(400).json(error));
            });
        }
        User.destroy({where: {id: req.params.id}})
        .then(() => res.status(200).json({message: "Utilisateur supprimé !"}))
        .catch(error => res.status(400).json(error));

    })
    .catch(error => res.status(400).json(error));
};

exports.getPostByUser = (req, res) => {
    if(res !== null) {
        User.findOne({
            order: [
                [{model: Post}, 'createdAt', 'DESC']
            ],
            include: [{
                model: Post,
                attributes: ['id', 'image', 'contenu', 'UserId', 'createdAt', 'updatedAt'],
                include: [{
                    model: Comment,
                    attributes: ['id', 'contenu', 'createdAt', 'updatedAt'],
                    required: false
                }, {
                    model: User,
                    attributes: ['id', 'nom', 'prenom', 'image'],
                    required: false
                },{
                    model: Like_post,
                    attributes: ['createdAt', 'updatedAt', 'isLike'],
                    include: [{model: User, attributes: ['id', 'nom', 'prenom', 'image']}],
                    required: false
                }],
                required: true
            }],
            where: {
                id: req.params.id
            },
            attributes: ['nom', 'prenom', 'image', 'email', 'telephone'],
        })
        .then(post => {
            if(!post) {
                User.findOne({
                    where: {
                        id: req.params.id
                    },
                    attributes: ['nom', 'prenom', 'image', 'email', 'telephone']
                })
                .then(post => res.status(200).json(post))
                .catch(error => res.status(400).json(error));
            } else {
                res.status(200).json(post)}
            }
        )
        .catch(error => res.status(400).json(error));
    }
};