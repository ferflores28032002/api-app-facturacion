const { Router } = require("express");
const invoiceController = require("../controllers/invoiceController");

const invoiceRouter = Router();

invoiceRouter.post("/", invoiceController.postInvoice);
invoiceRouter.get("/", invoiceController.getAllInvoices);
invoiceRouter.get("/:invoiceNumber", invoiceController.getInvoiceByNumber);

module.exports = invoiceRouter;