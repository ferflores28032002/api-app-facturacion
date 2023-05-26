const { Router } = require("express");
const productsController = require('../controllers/productsController');
const { productValidationRules } = require("../validation/product.validate");

const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);

productsRouter.get("/:productId", productsController.getProduct);

productsRouter.post("/", productValidationRules, productsController.postProduct);

module.exports = productsRouter;