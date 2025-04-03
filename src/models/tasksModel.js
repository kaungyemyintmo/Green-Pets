// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db.js');

// ##############################################################
// SELECT 
// ##############################################################
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Task ; 
    `; 

pool.query(SQLSTATEMENT, callback); 
}

module.exports.selectById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Task
    WHERE task_id =?; 
    `;

    const VALUES = [data.task_id]; 
pool.query(SQLSTATEMENT, VALUES, callback); 
}

// ##############################################################
// INSERT 
// ##############################################################
module.exports.insertNew = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?); 
    `;
const VALUES = [data.title, data.description, data.points]; 

pool.query(SQLSTATEMENT, VALUES, callback); 
}

// ##############################################################
// UPDATE 
// ##############################################################
module.exports.updateById = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Task 
    SET title =? , description =?, points =?
    WHERE task_id = ?;
    `; 

    const VALUES = [data.title, data.description, data.points, data.task_id]; 

pool.query(SQLSTATEMENT, VALUES, callback); 
}

// ##############################################################
// DELETE 
// ##############################################################
module.exports.deleteById = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE table1, table2 
    FROM Task table1
    LEFT JOIN TaskProgress table2 ON table1.task_id = table2.task_id
    WHERE table1.task_id =? 
    AND (table2.task_id IS NULL OR table2.task_id = table1.task_id);
    
    ALTER TABLE Task AUTO_INCREMENT = 1; 
    `;

const VALUES = [data.task_id]; 

pool.query(SQLSTATEMENT, VALUES, callback); 
}

