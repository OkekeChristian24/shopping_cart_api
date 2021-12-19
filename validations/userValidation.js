const { body } = require('express-validator');

const validateCreateUser = [
    body("first_name", "Enter first name")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("last_name", "Enter last name")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("email", "No email found")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isEmail().withMessage("Invalid email address")
    ,
    body("password", "No password found")
        .exists({checkFalsy: true})
        .not().isEmpty()
    

];

const validateUserEdit = [
    body("first_name", "Enter first name")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
    ,
    body("last_name", "Enter last name")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .trim()
        .escape()
];

const validateUserEmailEdit = [
    body("email", "No email found")
        .exists({checkFalsy: true})
        .not().isEmpty()
        .isEmail().withMessage("Invalid email address")
];

const validateUserPasswordEdit = [
    body("password", "No password found")
        .exists({checkFalsy: true})
        .not().isEmpty()
];


module.exports = {
    validateCreateUser,
    validateUserEdit,
    validateUserEmailEdit,
    validateUserPasswordEdit
};