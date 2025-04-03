const express = require('express');
const router = express.Router();

const controller = require('../controllers/userController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

router.get('/', controller.readAllUser);
router.post('/', controller.checkUsernameOrEmailExist, controller.register);

// to get trivia questions 
router.get('/trivia', controller.readAllTrivia);

// to read user by its id 
router.get('/details', jwtMiddleware.verifyToken, controller.userExistence, controller.readById);
router.put('/:user_id', jwtMiddleware.verifyToken, controller.checkUsernameOrEmailExist, controller.updateUser);
router.delete('/:user_id', controller.userExistence, controller.delById);


// ##############################################################
// PERFORM TASKS
// ##############################################################
router.get('/tasks/:task_id', jwtMiddleware.verifyToken, controller.userExistence, controller.taskExistence, controller.performTasks, controller.readById);


// ##############################################################
// TRIVIA
// ##############################################################

//to create new trivia questions 
router.post('/trivia', controller.createTrivia);

//to read trivia questions by its id 
router.get('/trivia/:trivia_id', jwtMiddleware.verifyToken, controller.readTriviaById); 

//to answer a trivia question 
router.put('/trivia/:trivia_id/:user_ans', jwtMiddleware.verifyToken, controller.userExistence, controller.triviaExistence, controller.triviaAnswer, controller.triviaProgress, controller.completeTrivia); 


// ##############################################################
//  EXPORT MODULES
// ##############################################################
module.exports = router; 


// ##############################################################
// MIDDLEWEARS 
// ##############################################################
// controller.userExistence - to check user existence
// controller.taskExistence - to check task existence
// controller.triviaExistence - to check trivia existence
// controller.triviaAnswer - to check if answer is correct
// ##############################################################