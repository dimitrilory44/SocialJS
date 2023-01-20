const db = require('../models');
const { User } = db.sequelize.models;

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.checkAdmin = (req, res) => {
    User.findAll({
        where: {
            isAdmin: 1
        }
    })
    .then(users => {
        if(users.length > 0) {
            return res.status(200).json({message: true})
        }
        return res.status(200).json({message: false})
    })
    .catch(error => res.status(400).json(error))
}

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = {
            email: req.body.email,
            password: hash,
            nom: req.body.nom,
            prenom: req.body.prenom,
            isAdmin: req.body.isAdmin
        };
        User.create(user)
        .then(() => res.status(201).json({message: 'Utilisateur crée !'}))
        .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res) => {
    User.findOne({where: {email: req.body.email}})
    .then(user => {
        if(!user) {
            return res.status(401).json({error: 'Utilisateur non trouvé !'})
        } 
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid) {
                return res.status(401).json({error: 'Mot de passe incorrect !'})
            }
            res.status(200).json({
                userId: user.id,
                token: jwt.sign(
                    {userId: user.id},
                    process.env.TOKEN_SECRET,
                    { expiresIn: '2h' }
                )
            })
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};