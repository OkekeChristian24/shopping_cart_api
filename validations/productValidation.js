const { body } = require('express-validator');

const validateCreateProduct = [
    body("name", "Enter product name")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("description", "Enter product description")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("category", "Enter product category")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("price", "No product price")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid product price')
            }
            return true;
    }),
    body("qty_available", "Enter quantity")
    .exists({checkFalsy: true})
    .not().isEmpty()
    .custom((value, { req }) => {

        if(!(Number.isInteger(value) && value > 0)){
            throw new Error('Invalid quantity');
        }
        return true;
    })
];

const validateProductEdit = [
    body("name", "Enter product name")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("description", "Enter product description")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("category", "Enter product category")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("price", "No product price")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid product price')
            }
            return true;
    }),
];

const validateQtyEdit = [
    body("qty_available", "Enter quantity")
    .exists({checkFalsy: true})
    .not().isEmpty()
    .custom((value, { req }) => {

        if(!(Number.isInteger(value) && value > 0)){
            throw new Error('Invalid quantity');
        }
        return true;
    })
];

module.exports = {
    validateCreateProduct,
    validateProductEdit,
    validateQtyEdit
};