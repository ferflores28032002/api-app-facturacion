const { body } = require('express-validator');

const categoryValidationRules = [
    body('categoryName').notEmpty().withMessage('El nombre de la categoría es requerido'),
    body('categoryDescripcion').optional().isString().withMessage('La descripción de la categoría debe ser una cadena de texto'),
];

module.exports = {
    categoryValidationRules
}