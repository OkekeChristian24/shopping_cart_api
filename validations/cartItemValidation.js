const { body } = require('express-validator');

const validateCreateItem = [
    body("product_id", "No product id")
    .exists({checkFalsy: true})
    .not().isEmpty()
    .custom((value, { req }) => {

        if(!(Number.isInteger(value) && value > 0)){
            throw new Error('Invalid product id');
        }
        return true;
    }), 
    body("quantity", "No quantity")
    .exists({checkFalsy: true})
    .not().isEmpty()
    .custom((value, { req }) => {

        if(!(Number.isInteger(value) && value > 0)){
            throw new Error('Invalid quantity');
        }
        return true;
    }),
    body("item_price", "No item price")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .custom((value, { req }) => {
            if(!(!isNaN(value)  && value > 0)){
                throw new Error('Invalid item price')
            }
            return true;
    }),
];

const validateQtyEdit = [
    body("quantity", "No quantity")
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
    validateCreateItem,
    validateQtyEdit
};