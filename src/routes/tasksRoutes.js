// ##############################################################
// REQUIRE EXPRESS
// ##############################################################
const express = require('express');
const router = express.Router(); 


// ##############################################################
// IMPORT CONTROLLER
// ##############################################################
const controller = require('../controllers/tasksController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');

// ##############################################################
// DEFINE ROUTES
// ##############################################################
router.get('/', controller.readAllTasks); 
router.post('/', jwtMiddleware.verifyAdminToken, controller.createNewTask); 

// USING ID
router.get('/:id', controller.readTaskById);
router.put('/:id', jwtMiddleware.verifyAdminToken, controller.taskExistence, controller.updateTaskById);
router.delete('/:id',jwtMiddleware.verifyAdminToken, controller.taskExistence, controller.delTaskById); 


// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router; 


// ##############################################################
// MIDDLEWEARS 
// ##############################################################
// controller.taskExistence - to check if task_id exists
// ##############################################################