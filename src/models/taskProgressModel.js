// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db.js');


// ##############################################################
// SELECT 
// ##############################################################

module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM TaskProgress ; 
    `; 

pool.query(SQLSTATEMENT, callback); 
}

// to read specific task progress by id
module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM TaskProgress
    WHERE progress_id =?; 
    `;

    const VALUES = [data.progress_id]; 
pool.query(SQLSTATEMENT, VALUES, callback); 
}

// to read all task progresses by user id
module.exports.selectByUser = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM TaskProgress
    WHERE user_id =?; 
    `;

    const VALUES = [data.user_id]; 
pool.query(SQLSTATEMENT, VALUES, callback); 
}

//to check if user exists 
module.exports.checkUser = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * 
    FROM User 
    WHERE user_id =?; 
    `;

    const VALUES = [data.user_id]; 

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//to check if task exists 
module.exports.checkTask = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * 
    FROM Task 
    WHERE task_id =?; 
    `;

    const VALUES = [data.task_id]; 

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectByToken = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * 
    FROM User 
    WHERE password = ?; `

    const VALUES = [data.password]; 
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ##############################################################
// INSERT 
// ##############################################################

module.exports.insertNew = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?); 
    `;
const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes]; 

pool.query(SQLSTATEMENT, VALUES, callback); 
}


module.exports.insertNewNoNotes = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO TaskProgress (user_id, task_id, completion_date)
    VALUES (?, ?, ?); 
    `;
const VALUES = [data.user_id, data.task_id, data.completion_date]; 

pool.query(SQLSTATEMENT, VALUES, callback); 
}


// ##############################################################
// UPDATE 
// ##############################################################

module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE TaskProgress 
    SET notes =?
    WHERE progress_id = ?;
    `; 

    const VALUES = [data.notes, data.progress_id]; 

pool.query(SQLSTATEMENT, VALUES, callback); 
}

// ##############################################################
// DELETE 
// ##############################################################

module.exports.deleteById = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM TaskProgress
    WHERE progress_id =? ;
    
    ALTER TABLE Task AUTO_INCREMENT = 1; 
    `;

const VALUES = [data.progress_id]; 

pool.query(SQLSTATEMENT, VALUES, callback); 
}
