const express = require('express'),
    userRouter = express.Router();
    User = require('../models/userModel');

const routes = () => {
    userRouter.route('/')
        .get((req, res) => {
            if (User.isUserAuthenticated()) {
                res.json(User.geUser());
            } else {
                res.status(403).send('forbidden');
            }
        })
        .post((req, res) => {
            res.json(User.getLogged(req.body));
        })
        .put((req, res) => {
            if (User.isUserAuthenticated()) {
                User.updateUser(req.body);
                res.status(201).send('ok');
            } else {
                res.status(403).send('forbidden');
            }
        });

    userRouter.route('/logout')
        .post((req, res) => {
            res.json(User.logout());
        });

    userRouter.route('/authenticated')
        .get((req, res) => {
            res.json(User.isUserAuthenticated());
        });

    return userRouter;
}

module.exports = routes;
