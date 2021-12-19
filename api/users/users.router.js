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

const { checkToken } = require('../../authorizations/tokenAuth');

router.post('/', registerUser);
router.post('/login', loginUser);
router.put('/:id', checkToken, updateUser);
router.put('/email/:id', checkToken, updateUserEmail);
router.put('/password/:id', checkToken, updateUserPassword);
router.delete('/:id', checkToken, deleteUser);

module.exports = router;
