const express = require('express'),
    sellerCategoryRouter = express.Router();
    SellerCategory = require('../models/sellerCategoryModel');

const routes = () => {
    sellerCategoryRouter.route('/')
        .get((req, res) => {
            res.json(SellerCategory.getSellerCategories());
        });

    return sellerCategoryRouter;
};

module.exports = routes;
