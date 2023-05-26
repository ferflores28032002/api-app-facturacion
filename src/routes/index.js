const productsRouter = require("./productRouter");
const categoriesRouter = require("./categoryRouter");
const invoicesRouter = require("./invoiceRouter");
const syncModel = require("../models/syncModel");

module.exports = {
    productsRouter,
    categoriesRouter,
    invoicesRouter,
    syncModel
}