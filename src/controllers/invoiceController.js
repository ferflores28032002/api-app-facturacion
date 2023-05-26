const Invoices = require("../models/Invoice");
const InvoiceDetails = require("../models/InvoiceDetail");
const Products = require("../models/Product");
const sequelize = require("../models/connection");

const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoices.findAll({
            include: [{ model: InvoiceDetails, include: [Products] }],
        });

        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

const getInvoiceByNumber = async (req, res) => {
    const { invoiceNumber } = req.params;

    try {
        const invoice = await Invoices.findOne({
            where: { invoiceNumber },
            include: [{ model: InvoiceDetails, include: [Products] }],
        });

        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not Found!' });
        }

        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

const postInvoice = async (req, res) => {
    const newInvoice = req.body;

    const invoice = {
        client: newInvoice.client,
    };

    const invoiceDetails = newInvoice.details;

    const t = await sequelize.transaction(); // Iniciar transacción

    try {
        const createdInvoice = await Invoices.create(invoice, { transaction: t });

        for (const detail of invoiceDetails) {
            detail.invoiceNumber = createdInvoice.invoiceNumber;

            const product = await Products.findByPk(detail.productId, { transaction: t });

            if (product != null && product.stock >= detail.qty) {
                const createdDetail = await InvoiceDetails.create(detail, { transaction: t });

                // Disminuir el stock del producto
                product.stock -= detail.qty;
                await product.save({ transaction: t });
            } else {
                // Si no hay suficiente stock, lanzar un error y revertir la transacción
                if (t.finished !== 'rollback' && t.finished !== 'commit') {
                    await t.rollback();
                }
                throw new Error(`No hay suficiente stock para el producto: ${product.productName}`);
            }
        }

        await t.commit(); // Confirmar la transacción

        res.status(201).json({ invoiceNumber: createdInvoice.invoiceNumber });
    } catch (error) {
        if (t.finished !== 'rollback' && t.finished !== 'commit') {
            await t.rollback(); // Revertir la transacción en caso de error y atrapamos el error con el catch 
        }
        res.status(500).json({ message: `Error: ${error.message}` });
    }
};

module.exports = {
    postInvoice,
    getAllInvoices,
    getInvoiceByNumber
}