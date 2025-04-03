const express = require('express');
const router = express.Router();

const controller = require('../controllers/messageController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// to read all messages 
router.get('/', controller.readAllMessage);

// to create new message 
router.post('/', jwtMiddleware.verifyToken, controller.createMessage);

// to read all messages by user id
router.get('/user', jwtMiddleware.verifyToken, controller.readByUser);

// to read messages by its id
router.get('/:id', controller.readMessageById);

// to update messages 
router.put('/:id', jwtMiddleware.verifyToken, controller.updateMessageById);

// delete messages 
router.delete('/:id', jwtMiddleware.verifyToken, controller.deleteMessageById);


module.exports = router;