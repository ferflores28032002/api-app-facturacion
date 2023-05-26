const { Router } = require("express");
const categoriesController = require('../controllers/categoriesController');
const { categoryValidationRules } = require("../validation/category.validate");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getCategories);

categoriesRouter.get("/:categoryId", categoriesController.getCategory);

categoriesRouter.post("/", categoryValidationRules, categoriesController.postCategory);

categoriesRouter.put("/:categoryId", categoryValidationRules, categoriesController.updateCategory);


module.exports = categoriesRouter;