// ##############################################################
// IMPORTING TASK MODEL  
// ##############################################################
const tasksModel = require("../models/tasksModel.js");


// ##############################################################
// DEFINE FUNCTIONS TO PERFORM API REQUESTS 
// ##############################################################

// ##############################################################
// GET REQUESTS 
// ##############################################################

//to read all tasks
module.exports.readAllTasks = (req, res, next) => {
    const callback = (error, result, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(200).json(result);
        }
    }
    tasksModel.selectAll(callback);
}

// to read task by id 
module.exports.readTaskById = (req,res,next)=> {

    const data = {
        task_id : req.params.id
    }

    const callback= (error,results,fields) => {
        if(error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if(results.length == 0) {
                res.status(404).json(
                    "Error : Task not found."
                ); 
            }
            else {
                res.status(200).json(results); 
            }
        }
    }
    tasksModel.selectById(data,callback);
}


// ##############################################################
// POST REQUESTS 
// ##############################################################

//to create a new task 
module.exports.createNewTask = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json("Error : Bad request");
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(201).json({
                message: `Task successfully created.`
            });
        }
    }

    tasksModel.insertNew(data, callback);
}


// ##############################################################
// PUT REQUESTS 
// ##############################################################

//to update the task details by id 
module.exports.updateTaskById = (req, res, next) => {
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            message: "Error: Bad request"
        });
        return;
    }

    const data = {
        task_id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json(
                    "Error : Task not found"
                );
            }
            else {
                res.status(201).json({
                    message: "Task successfully updated."
                }); //201 OK
            }
        }
    }
        tasksModel.updateById(data, callback);
    }


// ##############################################################
// DELETE REQUESTS 
// ##############################################################

// to delete task by id 
module.exports.delTaskById = (req,res,next) => {
    const data ={
        task_id : req.params.id
    }

    const callback = (error,results,fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.affectedRows == 0) {
                res.status(404).json(
                     "Error : Task not found"
                ); 
            }
            else {
                res.status(204).json({
                    message: `Task successfully created.`
                }); //204 NO content 
            }
        }
    }
    tasksModel.deleteById(data, callback);
}


// ##############################################################
// MIDDLEWEAR 
// ##############################################################

 // ~ ~ ~ ~ EXISTENCE ~ ~ ~ ~

//middlewear to check if task exists
module.exports.taskExistence = (req, res, next) => {
    const data = {
        task_id: req.params.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }

        if (results.length === 0) {
            return res.status(404).json('Error : Task not found' );
        }
        else {
            next();
        }
    }
    tasksModel.selectById(data, callback);
}