const express = require('express');
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./../db/connection');
const users = db.get('users');
users.createIndex('username', { unique: true });

const router = express.Router();

const schema = Joi.object({
    username: Joi.string()
        .regex(/(^[a-zA-Z0-9_]*$)/)
        .min(2)
        .max(30)
        .required(),
 
    password: Joi.string()
        .trim()
        .min(10)
        .required()

})
// any route in here is pre-pended with /auth

router.get('/', (req, res) => {
    res.json({
        message: 'Auth router working!'
    })
})

router.post('/signup', (req, res, next) => {
    const result = schema.validate(req.body);
    if (!result.error) {
        // make sure user is uniqe
        users.findOne({
            username: req.body.username
        }).then((user) => {
            // if user is undefined, username is not in db, otherwise duplicate user detecte
            if (user) {
                // there is already a user in db with username
                // send error
                const error = new Error('That username is not unique. Please choose another one.');
                res.status(409);
                next(error);
            } else {
                // hash password
                // insert user with hashed password
                bcrypt.hash(req.body.password, 12).then((hashed) => {
                    const newUser = {
                        username: req.body.username,
                        password: hashed,
                        role: 'user',
                        active: true
                    }
                    users.insert(newUser).then((insertedUser) => {
                        createTokenSendResponse(insertedUser, res, next)
                    })
                })
            }
        })
    } else {
        // send error back to client
        res.status(422);
        next(result.error);
    }
})


router.post('/login', (req, res, next) => {
    const result = schema.validate(req.body);
    if (!result.error) {
        // if user does exist
        users.findOne({
            username: req.body.username,
        }).then((user) => {
            // if user exists, compare hashed password
            if (user && user.active) {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((result) => {
                        if (result) {
                            // its the right password
                            createTokenSendResponse(user, res, next);
                        } else {
                            // wrong password
                            showError(res, next)
                        }
                    })
            } else {
                showError(res, next)
            }
        })
    } else {
        // this is if the user doesnt exist
        showError(res, next)
    }
})

function showError(res, next) {
    res.status(422);
    const error = new Error('Unable to login');
    next(error)
}

function createTokenSendResponse(user, res, next) {
    const payload = {
        _id: user._id,
        username: user.username,
        role: user.role,
        active: user.active
    }
    jwt.sign(
        payload,
        process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    }, (err, token) => {
        if (err) {
            showError(res, next);
        } else {
            // login all good
            res.json({token})
        }
    });
}

module.exports = router;