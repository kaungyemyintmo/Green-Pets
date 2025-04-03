// ##############################################################
// REQUIRE ROUTER 
// ##############################################################
const express = require('express');
const router = express.Router(); 


// ##############################################################
// IMPORT CONTROLLER 
// ##############################################################
const controller = require('../controllers/petController');
const jwtMiddleware = require('../middlewares/jwtMiddleware');


// ##############################################################
// CRUD OPERATIONS
// ##############################################################

//read all pets
router.get('/', controller.readAllPet); 

//to rank top pets based on their levels 
router.get('/leaderboard', controller.petRanking); 

//to get quest questions 
// router.get('/:pet_id/quest/:quest_id', controller.readQuestById)

//to read pet duties 
router.get('/duty', controller.readAllDuties); 

//to read pet duties by id 
router.get('/duty/:duty_id', controller.readDutyById); 

//create pets depending on user points 
router.post('/:store_id/purchase', jwtMiddleware.verifyToken, controller.enoughPointsForPet, controller.deductPointsForPet, controller.createNewPetByUserId); 

//read all pets owned by a user
router.get('/users/', jwtMiddleware.verifyToken, controller.userExistence, controller.readAllPetsByUserId);

// read specific pet owned by a user
router.get('/:pet_id/users/',  jwtMiddleware.verifyToken, controller.userExistence, controller.readOwnedPetsById)
//read user pet by its id 
router.get('/:store_id', controller.readPetByPetId);

//to perform pet duties 
router.put('/:pet_id/duty/:duty_id', controller.petExistence, jwtMiddleware.verifyToken, controller.userExistence, controller.petOwnership, controller.dutyExistence, controller.enoughDutyPoints, controller.deductPointsForDuty, controller.performDuties);

// //update a pet by checking if it belongs to a user
// router.put('/:pet_id/update', controller.petExistence,jwtMiddleware.verifyToken, controller.petOwnership, controller.updatePetByUserId);

//delete pet after checking if it belongs to a user
router.delete('/:pet_id/users', controller.petExistence, jwtMiddleware.verifyToken, controller.petOwnership, controller.delPetByUserId); 
 
//for pet to level up 
router.get('/:pet_id/levelUp',controller.petExistence,jwtMiddleware.verifyToken, controller.userExistence, controller.petOwnership, controller.enoughEnergyToLevelUp, controller.deductEnergiesForLevel, controller.levelUpPetById); 


// ##############################################################
// EXPORT ROUTER
// ##############################################################
module.exports = router; 


// ##############################################################
// MIDDLEWEARS 
// ##############################################################
// controller.userExistence - to check if an user id exists
// controller.enoughPointsForPet - to check if there are enough points to buy a pet 
// controller.deductPointsForPet - to deduct points from total_points when user creates a pet
// controller.petOwnership - to check if a pet belongs to a user || user authentication
// controller.petExistence - to check if a pet exists
// controller.dutyExistence - to check if a duty exists
// controller.enoughDutyPoints - to check if there are enough points to perform a duty 
// controller.deductPointsForDuty - to deduct points from total_points when pet does a duty
// controller.questExistence - to check if a quest exists
// controller.questAnswer - to check if the answer is correct 
// controller.enoughEnergyToLevelUp - to check if pet has enough energy to level up 
// controller.deductEnergiesForLevel - to deduct energies from pet after leveling up 
// ##############################################################