const express = require('express'),
    gameRouter = express.Router(),
    Game = require('../models/gameModel');

const routes = () => {
    gameRouter.route('/')
        .post((req, res) => {
            const game = {
                name: req.body.name,
                dateRelease: req.body.dateRelease,
                imageUrl: req.body.imageUrl
            };
            console.log(game);
            Game.addGame(game);
            res.status(201);
            res.send(game);
        })
        .get((req, res) => {
            res.json(Game.getGames());
        });
        // TODO: Use middleware to resolve game.
        gameRouter.route('/:id')
            .get((req, res) => {
                const game = Game.getGame(req.params.id);
                if (game) {
                    res.json(game);
                } else {
                    res.status(404).send('no game found');
                }
            })
            .put((req, res) => {
                // NOTE: Any seller will be remove!!!
                const game = {
                    name: req.body.name,
                    dateRelease: req.body.dateRelease,
                    imageUrl: req.body.imageUrl
                };
                Game.updateGame(game);
                res.json(game);
            })
            .delete((req, res) => {
                Game.deleteGame(req.params.id);
                res.status(204).send('remove');
            });

    return gameRouter;
};

module.exports = routes;
