// ##############################################################
// IMPORTING PROGRESS MODEL 
// ##############################################################
const progressModel = require("../models/taskProgressModel.js");


// ##############################################################
// DEFINE FUNCTIONS TO PERFORM API REQUESTS 
// ##############################################################


// ##############################################################
// GET REQUESTS 
// ##############################################################

//to read all progresses
module.exports.readAllProgress = (req, res, next) => {
    const callback = (error, result, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(200).json(result);
        }
    }
    progressModel.selectAll(callback);
}

// to read progress by id 
module.exports.readUserByToken = (req,res,next)=> {

    const data = {
        password : req.body.password
    }

    const callback= (error,results,fields) => {
        if(error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if(results.length == 0) {
                res.status(404).json("Error : Task progress not found."
                ); 
            }
            else {
                res.status(200).json(results); 
            }
        }
    }
    progressModel.selectByToken(data,callback);
}


// to read progress by id 
module.exports.readById = (req,res,next)=> {

    const data = {
        progress_id : req.params.id
    }

    const callback= (error,results,fields) => {
        if(error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if(results.length == 0) {
                res.status(404).json("Error : Task progress not found."
                ); 
            }
            else {
                res.status(200).json(results); 
            }
        }
    }
    progressModel.selectById(data,callback);
}

// to read progress by user id 
module.exports.readByUserId = (req,res,next)=> {

    const data = {
        user_id : res.locals.id
    }

    const callback= (error,results,fields) => {
        if(error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if(results.length == 0) {
                res.status(404).json("Error : Task progress not found."
                ); 
            }
            else {
                res.status(200).json(results); 
            }
        }
    }
    progressModel.selectByUser(data,callback);
}

// ##############################################################
// POST REQUESTS 
// ##############################################################

//to create a new progress 
module.exports.createNewProgress = (req, res, next) => {
    const userId = res.locals.id; 
    //if user puts no notes 
    if (!req.body.hasOwnProperty("notes") ){
        if ( req.body.task_id == undefined || req.body.completion_date == undefined ) {
            res.status(400).json("Error : Missing data.");
            return;
        }
    
        const data = {
            user_id: userId, 
            task_id: req.body.task_id,
            completion_date: req.body.completion_date
                }
    
        const callback = (error, results, fields) => {
            if (error) {
                return res.status(500).json("Error : Internal Server Error");
            }
            else {
                res.status(201).json( `Progress successfully created.`);
            }
        }
    
        progressModel.insertNewNoNotes(data, callback);
}

//with notes
else {
    if ( req.body.task_id == undefined || req.body.completion_date == undefined || req.body.notes == undefined) {
        res.status(400).json("Error : Missing data.");
        return;
    }

    const data = {
        user_id: userId, 
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
        }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(201).json( `Progress successfully created.`);
        }
    }

    progressModel.insertNew(data, callback);
}
}


// ##############################################################
// PUT REQUESTS 
// ##############################################################

//to update the progress notes by id 
module.exports.updateProgressById = (req, res, next) => {
    if (req.body.notes == undefined || req.body.notes == '') {
        res.status(400).json(
             "Missing notes."
        );
        return;
    }

    const data = {
        user_id : req.body.user_id,
        progress_id: req.params.id,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json(
                     "Error : Task progress not found"
                );
            }
            else {
                res.status(200).json({
                    message: "Task progress successfully updated."
                }); //200 OK
            }
        }
    }
        progressModel.updateById(data, callback);
    }


// ##############################################################
// DELETE REQUESTS 
// ##############################################################

// to delete progress by id 
module.exports.delById = (req,res,next) => {
    const data ={
        progress_id : req.params.id
    }

    const callback = (error,results,fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.affectedRows == 0) {
                res.status(404).json(
                     "Error : Task progress not found"
                ); 
            }
            else {
                res.status(204).json({
                    message: `Progress successfully created.`
                }); //204 NO content 
            }
        }
    }
    progressModel.deleteById(data, callback);
}


// ##############################################################
// MIDDLEWEAR 
// ##############################################################

//middlewear to check if user_id exists
module.exports.userExistence = (req, res, next) => {
    const data = {
        user_id: req.body.user_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length === 0) {
                res.status(404).json( `Error : User not found.` );
            }
            else {
                next();
            }
        }
    }
    progressModel.checkUser(data, callback);
}

//middlewear to check if task_id exists
module.exports.taskExistence = (req, res, next) => {
    const data = {
        task_id: req.body.task_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length === 0) {
                res.status(404).json( `Error : Task not found.` )
            }
            else {
                next();
            }
        }
    }
    progressModel.checkTask(data, callback);
}

//middlewear to check if progress_id exists
module.exports.progressExistence = (req, res, next) => {
    const data = {
        progress_id: req.params.id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length === 0) {
                res.status(404).json(`Error : Task Progress not found.`)
            }
            else {
                next();
            }
        }
    }
    progressModel.selectById(data, callback);
}