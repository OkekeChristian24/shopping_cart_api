// Import users controllers
const {
    registerUser,
    loginUser,
    updateUser,
    updateUserEmail,
    updateUserPassword,
    deleteUser
} = require('./users.controller');
const router = require('express').Router();


router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.put('/email/:id', updateUserEmail);
router.put('/password/:id', updateUserPassword);
router.delete('/:id', deleteUser);

module.exports = router;
