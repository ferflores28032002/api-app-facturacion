const { body } = require('express-validator');

const productValidationRules = [
    body('productName').notEmpty().withMessage('El nombre del producto es requerido'),
    body('price').notEmpty().withMessage('El precio del producto es requerido'),
    body('price').isFloat({ min: 0 }).withMessage('El precio del producto debe ser un número positivo'),
    body('stock').notEmpty().withMessage('El stock del producto es requerido'),
    body('stock').isFloat({ min: 0 }).withMessage('El stock del producto debe ser un número positivo'),
];

module.exports = { productValidationRules };
