//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const express = require('express');
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const bcryptMiddleware = require('../middlewares/bcryptMiddleware')
const userController = require('../controllers/userController')
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const tasksRoutes = require('./tasksRoutes');
const taskProgressRoutes = require('./taskProgressRoutes');
const messageRoutes = require('./messageRoutes');

//////////////////////////////////////////////////////
// CREATE ROUTER
//////////////////////////////////////////////////////
const router = express.Router();

//////////////////////////////////////////////////////
// DEFINE ROUTES
//////////////////////////////////////////////////////
router.use("/user", userRoutes);
router.use("/tasks", tasksRoutes);
router.use("/pet", petRoutes);
router.use("/task_progress", taskProgressRoutes);
router.use("/message", messageRoutes);


//////////////////////////////////////////////////////
// CREATE MAIN ROUTES 
//////////////////////////////////////////////////////
router.post("/login", userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);

router.post("/login/admin", jwtMiddleware.checkCode, userController.login, bcryptMiddleware.comparePassword, jwtMiddleware.generateAdminToken, jwtMiddleware.sendToken);

router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.register);

// to check user credibility before proceeding
router.get("/jwt/admin", jwtMiddleware.verifyAdminToken, jwtMiddleware.sendToken);

//////////////////////////////////////////////////////
// EXPORT ROUTER
//////////////////////////////////////////////////////
module.exports = router;