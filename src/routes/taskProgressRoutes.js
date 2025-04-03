// ##############################################################
// REQUIRE EXPRESS
// ##############################################################
const express = require('express');
const router = express.Router(); 


// ##############################################################
// IMPORT CONTROLLER
// ##############################################################
const controller = require('../controllers/taskProgressController');

const jwtMiddleware = require('../middlewares/jwtMiddleware');
// ##############################################################
// DEFINE ROUTES
// ##############################################################

// read global progresses
router.get('/', controller.readAllProgress); 

// create new progress
router.post('/', jwtMiddleware.verifyToken, controller.createNewProgress); 

// USING ID
// read all progresses done by user
router.get('/user', jwtMiddleware.verifyToken, controller.readByUserId)

// read by progress id 
router.get('/:id', controller.readById);

// edit progress by progress id 
router.put('/:id', controller.progressExistence, jwtMiddleware.verifyToken, controller.updateProgressById);
router.delete('/:id', controller.progressExistence, controller.delById); 


// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router; 


// ##############################################################
// MIDDLEWEARS 
// ##############################################################
// controller.userExistence - to check if user id exists
// controller.taskExistence - to check if task id exists
// controller.progressExistence - to check if progress id exists
// ##############################################################