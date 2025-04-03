// ##############################################################
// IMPORTING USER MODEL 
// ##############################################################
const userModel = require("../models/userModel.js");

// ##############################################################
// DEFINE FUNCTIONS TO PERFORM API REQUESTS 
// ##############################################################

// ##############################################################
// GET REQUESTS
// ##############################################################


// ~ ~ ~ ~ USER ~ ~ ~ ~

//to read all users
module.exports.readAllUser = (req, res, next) => {
    const callback = (error, result, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(200).json(result);
        }
    }
    userModel.selectAll(callback);
}

// to read user by id 
module.exports.readById = (req, res, next) => {

    const data = {
        user_id: res.locals.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.length == 0) {
                res.status(404).json( `Error : User not found.`
                );
            }
            else {
                res.status(200).json(results[0]);
            }
        }
    }
    userModel.selectById(data, callback);
}

module.exports.login= (req,res,next) => {
    if (req.body.username == undefined || req.body.password == undefined) {
        res.status(400).json("Error : username or password is undefined");
        return;
    }
    const data = {
        username : req.body.username
    }

    const callback = (error,results,fields)=> {
        if (results.length == 0) {
            return res.status(404).json({message: "User not found"}); 
        }
        else {
           res.locals.id = results[0].user_id; 
           res.locals.hash = results[0].password;
           //console.log(res.locals.id + " and " + res.locals.hash);
           next();
        }
    }
    
        userModel.selectByUsername(data, callback);
}

// ~ ~ ~ ~ TRIVIA ~ ~ ~ ~

// to read all trivia 
module.exports.readAllTrivia = (req, res, next) => {
    const callback = (error, result, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(200).json(result);
        }
    }
    userModel.selectAllTrivia(callback);
}

// to read quest by id 
module.exports.readTriviaById = (req, res, next) => {

    const data = {
        trivia_id: req.params.trivia_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.length == 0) {
                res.status(404).json( "Error : Trivia not found."
                );
            }
            else {
                res.status(201).json(results);
            }
        }
    }
    userModel.selectTriviaById(data, callback);
}


// ##############################################################
// POST REQUESTS
// ##############################################################

// ~ ~ ~ ~ USER ~ ~ ~ ~

//to create a new user 
module.exports.register = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
        res.status(400).json("Error : username or email is undefined");
        return;
    }
    const data = {
        username: req.body.username,
        email: req.body.email, 
        password : res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(200).json("User created.")
        }
    }

    userModel.insertNew(data, callback);
}

// ~ ~ ~ ~ TRIVIA ~ ~ ~ ~

//to create a new trivia question
module.exports.createTrivia = (req, res, next) => {
    if (req.body.question == undefined || req.body.correctOpt == undefined || req.body.points == undefined) {
        res.status(400).json("Error : Missing or invalid data");
        return;
    }
    const data = {
        question: req.body.question,
        correctOpt: req.body.correctOpt,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(201).json({
                message: `Trivia successfully created.`
            });
        }
    }
    userModel.insertTrivia(data, callback);
}

// ##############################################################
// PUT REQUESTS
// ##############################################################

// ~ ~ ~ ~ USER DETAILS ~ ~ ~ ~

//to update the user details by id 
module.exports.updateUser = (req, res, next) => {
    if (req.body.username == undefined || req.body.email == undefined) {
        res.status(400).json({
            message: "Error: username or email is not defined"
        });
        return;
    }

    const data = {
        user_id: res.locals.id,
        username: req.body.username,
        email: req.body.email
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json( "Error : User not found"
                );
            }
            else {
                res.status(200).json({
                    message: "User successfully updated."
                });
            }
        }
    }
    userModel.updateById(data, callback);
}

// ~ ~ ~ ~ PERFORM TASKS ~ ~ ~ ~

// to get points for performing tasks 
module.exports.performTasks = (req, res, next) => {
    const data = {
        user_id: res.locals.id, 
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            next();
        }
    }
    userModel.addTaskPoints(data, callback);
}


// ~ ~ ~ ~ TRIVIA ~ ~ ~ ~

// to add points for getting the correct ans in a trivia 
module.exports.completeTrivia = (req, res, next) => {
    const data = {
        user_id: res.locals.id,
        trivia_id: req.params.trivia_id,
        user_ans: req.params.user_ans
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(200).json({ message: `${data.user_ans} was correct for question ${data.trivia_id}.User ${data.user_id} gained points!` })
        }
    }
    userModel.addTriviaPoints(data, callback);
}


// ##############################################################
// DELETE REQUESTS
// ##############################################################

// to delete user by id 
module.exports.delById = (req, res, next) => {
    const data = {
        user_id: req.params.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.affectedRows === 0) {
                res.status(404).json( "Error : User not found"
                );
            }
            else {
                res.status(200).json({
                    message: `User successfully deleted.`
                }); //204 NO content 
            }
        }
    }
    userModel.deleteById(data, callback);
}


// ##############################################################
// MIDDLEWEARS
// ##############################################################

// ~ ~ ~ ~ CHECK DUPlICATES ~ ~ ~ ~

// to check for email duplicates
module.exports.checkUsernameOrEmailExist = (req,res,next) => {
    if (req.body.username == undefined || req.body.email == undefined || req.body.password == undefined) {
 res.status(400).json("Error : username or email is undefined");
 return;
}
 const data ={
     email: req.body.email, 
     username : req.body.username 
 }

 const callback = (error,results,fields)=> {
     if (results.length != 0) {
         return res.status(409).json({message: "Username or email already exists"}); 
     }
     else {
         next();
     }
 }
 userModel.selectByEmailOrUsername(data, callback);
}


// ~ ~ ~ ~ EXISTENCE ~ ~ ~ ~

//middlewear to check if task exists
module.exports.taskExistence = (req, res, next) => {
    const data = {
        task_id: req.params.task_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }

        if (results.length === 0) {
            return res.status(404).json( 'Error : Task not found' );
        }
        else {
            next();
        }
    }
    userModel.taskById(data, callback);
}


// middlewear to check if trivia exists 
module.exports.triviaExistence = (req, res, next) => {

    const data = {
        trivia_id: req.params.trivia_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.length == 0) {
                res.status(404).json( "Error : Trivia not found."
                );
            }
            else {
                next();
            }
        }
    }
    userModel.selectTriviaById(data, callback);
}


//middlewear to check if a user exists
module.exports.userExistence = (req, res, next) => {
    const data = {
        user_id: res.locals.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length == 0) {
                res.status(404).json("Error : User does not exist." );
            }
            else {
                next();
            }
        }
    }

    userModel.selectById(data, callback);

}

// ~ ~ ~ ~ TRIVIA ~ ~ ~ ~

//middlewear to check if the ans is correct
module.exports.triviaAnswer = (req, res, next) => {
    const data = {
        trivia_id: req.params.trivia_id,
        user_ans: req.params.user_ans
    }
    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results[0]["correctOpt"] == data.user_ans) {
                next();
            }
            else {
                res.status(406).json(
                    { message: "Try again!" }
                );
            }
        }
    }
    userModel.triviaAnswerCheck(data, callback);
}


// to add the progress count for every correct answer
module.exports.triviaProgress = (req, res, next) => {
    const data = {
        user_id: res.locals.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            next();
        }
    }
    userModel.addTriviaCount(data, callback);
}