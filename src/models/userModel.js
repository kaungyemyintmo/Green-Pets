// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db.js');

// ##############################################################
// SELECT 
// ##############################################################

// ~ ~ ~ ~ USER DETAILS ~ ~ ~ ~

module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User ; 
    `; 

pool.query(SQLSTATEMENT, callback); 
}

module.exports.selectByUsername = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT user_id, password
    FROM User
    WHERE username = ?;
    `;
const VALUES = [data.username];

pool.query(SQLSTATMENT, VALUES, callback);   
}

module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT *
    FROM User
    WHERE user_id = ?;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);   
}

module.exports.selectAllTrivia = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Trivia ; 
    `; 

pool.query(SQLSTATEMENT, callback); 
}

//////////////////////////////////////////////////////
// SELECT USER BY USERNAME OR EMAIL
//////////////////////////////////////////////////////

module.exports.selectByEmailOrUsername = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE email = ?
    OR username =?;
    `;
const VALUES = [data.email, data.username];

pool.query(SQLSTATMENT, VALUES, callback);   
}

// ~ ~ ~ ~ TASK DETAILS ~ ~ ~ ~

//middlewear model to check if task exists
module.exports.taskById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * 
    FROM Task 
    WHERE task_id=?;
    `; 

const VALUES = [data.task_id]; 

pool.query(SQLSTATEMENT, VALUES, callback);
}

// ~ ~ ~ ~ TRIVIA ~ ~ ~ ~

//model to read trivia questions by its id 
module.exports.selectTriviaById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT 
    trivia_id, 
    question, 
    options
    FROM Trivia 
    WHERE trivia_id = ?; 
    `; 

    const VALUES = [data.trivia_id]; 

pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.triviaAnswerCheck = (data,callback) => {
    const SQLSTATEMENT = `
    SELECT correctOpt 
    FROM Trivia
    WHERE trivia_id = ?;
    `; 

    const VALUES = [data.trivia_id]; 
pool.query(SQLSTATEMENT, VALUES, callback);
}
// ##############################################################
// INSERT 
// ##############################################################

// ~ ~ ~ ~ USER DETAILS ~ ~ ~ ~

module.exports.insertNew = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?); 
    `;
const VALUES = [data.username, data.email, data.password]; 

pool.query(SQLSTATEMENT, VALUES, callback); 
}

// ~ ~ ~ ~ TRIVIA ~ ~ ~ ~

module.exports.insertTrivia = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Trivia (question, options, correctOpt, points)
    VALUES (?,?, ?, ?);
    `; 
    const VALUES = [data.question, data.options, data.correctOpt, data.points]; 

    pool.query(SQLSTATEMENT, VALUES, callback)
} 

// ##############################################################
// UPDATE 
// ##############################################################

// ~ ~ ~ ~ USER DETAILS ~ ~ ~ ~

module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE User 
    SET username =? , email =?
    WHERE user_id = ?;
    `; 

    const VALUES = [data.username, data.email, data.user_id,]; 

pool.query(SQLSTATEMENT, VALUES, callback); 
}

// ~ ~ ~ ~ POINTS ~ ~ ~ ~

//to add points 
module.exports.addTaskPoints = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE User
    SET total_points = total_points + (
        SELECT points
        FROM Task
        WHERE task_id = ?
    )
    WHERE user_id = ?;
    `;

const VALUES = [data.task_id, data.user_id]; 
pool.query(SQLSTATEMENT, VALUES, callback);
}

// ~ ~ ~ ~ TRIVIA ~ ~ ~ ~

module.exports.addTriviaPoints = (data,callback) => {
    const SQLSTATEMENT = `
    UPDATE User
    SET total_points = total_points + (
        SELECT points 
        FROM Trivia
        WHERE trivia_id = ? 
    )
    WHERE user_id =? ; 
    `; 
    const VALUES = [data.trivia_id, data.user_id]; 

    pool.query(SQLSTATEMENT, VALUES,callback);
}

module.exports.addTriviaCount = (data,callback) => {
    const SQLSTATEMENT = `
    UPDATE User
    SET trivia_progress = trivia_progress +1
    WHERE user_id =? ; 
    `; 
    const VALUES = [data.user_id]; 

    pool.query(SQLSTATEMENT, VALUES,callback);
}


// ##############################################################
// DELETE 
// ##############################################################

// ~ ~ ~ ~ USER DETAILS ~ ~ ~ ~

// LEFT JOIN 
module.exports.deleteById = (data, callback) => {

    const SQLSTATEMENT = `
    DELETE table1, table2, table3, table4
    FROM User table1
    LEFT JOIN Pet table2 ON table1.user_id = table2.user_id
    LEFT JOIN TaskProgress table3 ON table1.user_id = table3.user_id
    LEFT JOIN Review table4 ON table1.user_id = table4.user_id

    WHERE table1.user_id =?
    AND (table2.user_id IS NULL OR table2.user_id=table1.user_id OR
         table3.user_id IS NULL OR table3.user_id = table1.user_id OR
         table4.user_id IS NULL OR table4.user_id = table1.user_id);
    `;

const VALUES = [data.user_id]; 

pool.query(SQLSTATEMENT, VALUES, callback); 
}


