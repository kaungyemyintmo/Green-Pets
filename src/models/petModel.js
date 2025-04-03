// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db.js');


// ##############################################################
// SELECT 
// ##############################################################

// ~ ~ ~ ~ PET DETAILS ~ ~ ~ ~

//model to read all pets in the store 
module.exports.selectAll = (callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM PetsInStore ; 
    `;

    pool.query(SQLSTATEMENT, callback);
}

//model to read pets in store by id 
module.exports.selectByPetId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM PetsInStore 
    WHERE store_id =?; 
    `;

    const VALUES = [data.store_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.selectByPurchasedId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Pet 
    WHERE pet_id =?; 
    `;

    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//model to read all pets under a user 
module.exports.selectPetsByUserId = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM Pet
    WHERE user_id = ?;
    `;

    const VALUES = [data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//middlewear to check if pet has enough energies to level up 
module.exports.selectEnergiesById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT pet_energies  
    FROM Pet 
    WHERE pet_id =?
    AND pet_energies >= 50 ;
    `;

    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//middlewear to check if user id exists
module.exports.selectUserById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * FROM User
    WHERE user_id =?; 
    `;

    const VALUES = [data.user_id]; 
pool.query(SQLSTATEMENT, VALUES, callback); 
}

// ~ ~ ~ ~ OWNERSHIP ~ ~ ~ ~

//middlewear model to check pet ownership 
module.exports.petOwner = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT user_id
    FROM Pet
    WHERE pet_id = ?;
    `;

    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ~ ~ ~ ~ PET DUTIES ~ ~ ~ ~

//model to read all pet duties in the database 
module.exports.selectAllDuties = (callback) => {
    const SQLSTATEMENT = `
    SELECT * 
    FROM PetDuties ; 
    `;

    pool.query(SQLSTATEMENT, callback);
}

//middlwear to check if duty exists
//model to read pet duty by its id 
module.exports.selectDutyById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT * 
    FROM PetDuties 
    WHERE duty_id = ?; 
    `;

    const VALUES = [data.duty_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ~ ~ ~ ~ RANKING ~ ~ ~ ~

//model to rank pets according to their levels 
module.exports.petRank = (callback) => {
    const SQLSTATMENT = `
    SELECT
    pet_id,
    pet_name,
    user_id,
    type,
    pet_level,
    pet_energies,
    born_on,
    RANK() OVER (ORDER BY pet_level DESC) AS leaderboard_rank
FROM
    Pet
ORDER BY
    pet_level DESC;
    `;
    pool.query(SQLSTATMENT, callback);
}

// ~ ~ ~ ~ POINTS ~ ~ ~ ~

//middlewear model to check if user has enough points to buy a pet 
module.exports.enoughPetPoints = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT total_points
    FROM User 
    WHERE User.user_id = ? 
    AND User.total_points >= 
    (SELECT PetsInStore.points 
        FROM PetsInStore
        WHERE PetsInStore.store_id = ?);
    `;

    const VALUES = [data.user_id, data.store_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}


//middlewear model to check if user has enough points to perform a duty 
module.exports.enoughPointsForDuty = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT *
    FROM User 
    WHERE User.user_id = ? 
    AND User.total_points >= (
        SELECT cost_points
        FROM PetDuties 
        WHERE duty_id = ? 
        ) ;
    `;

    const VALUES = [data.user_id, data.duty_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ~ ~ ~ ~ QUESTS ~ ~ ~ ~

//model to read quest by its id 
module.exports.selectQuestById = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT 
    quest_id, 
    quest 
    FROM Quest 
    WHERE quest_id = ?; 
    `;

    const VALUES = [data.quest_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//middlewear model to check the answer
module.exports.questAnsCheck = (data, callback) => {
    const SQLSTATEMENT = `
    SELECT correctAns 
    FROM Quest
    WHERE quest_id = ?;
    `;

    const VALUES = [data.quest_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ##############################################################
// INSERT
// ##############################################################

// ~ ~ ~ ~ PET DETAILS ~ ~ ~ ~

//model to insert a new pet under a user 
module.exports.insertNew = (data, callback) => {
    const SQLSTATEMENT = `
    INSERT INTO Pet (store_id, user_id, pet_name, type, color)
    VALUES (?, ?, ?, (SELECT type FROM PetsInStore WHERE PetsInStore.store_id = ? LIMIT 1), ?); 
    `;

    const VALUES = [data.store_id, data.user_id, data.pet_name, data.store_id, data.color];

    pool.query(SQLSTATEMENT, VALUES, callback);
}



// ##############################################################
// UPDATE
// ##############################################################

// ~ ~ ~ ~ POINTS ~ ~ ~ ~

module.exports.deductPointsWhenBuyingPet = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE User
    SET total_points = total_points - (SELECT 
        PetsInStore.points FROM PetsInStore WHERE PetsInStore.store_id = ? )
    WHERE user_id = ? ;
    `;

    const VALUES = [data.store_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}


// ~ ~ ~ ~ PET DETAILS ~ ~ ~ ~

//model to update pet
module.exports.updatePetDetails = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Pet 
    SET pet_name =?, type =? , color =?
    WHERE pet_id = ?;
    `;

    const VALUES = [data.pet_name, data.type, data.color, data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//middlewear to deduct energies when pet levels up 
module.exports.deductPetEnergies = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Pet
    SET pet_energies = pet_energies - 50
    WHERE pet_id = ?;
    `;

    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

//to update the level 
module.exports.updatePetLevel = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Pet 
    SET pet_level = pet_level +1
    WHERE pet_id = ?;
    `;

    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ~ ~ ~ ~ PET DUTIES ~ ~ ~ ~

module.exports.addEnergiesAfterDuty = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Pet 
    SET pet_energies = pet_energies + (
        SELECT energies 
        FROM PetDuties
        WHERE duty_id =? 
    )
    WHERE pet_id = ? ;
    `;

    const VALUES = [data.duty_id, data.pet_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ~ ~ ~ ~ QUEST ~ ~ ~ ~

module.exports.addQuestEnergy = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE Pet
    SET pet_energies = pet_energies + (
        SELECT energies 
        FROM Quest
        WHERE quest_id = ? 
    )
    WHERE pet_id =? ; 
    `;
    const VALUES = [data.quest_id, data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

// ~ ~ ~ ~ SUSTAINABILITY POINTS ~ ~ ~ ~

//to deduct points when performing duties 
module.exports.deductPointsWhenDuty = (data, callback) => {
    const SQLSTATEMENT = `
    UPDATE User
    SET total_points = total_points - (
        SELECT cost_points 
        FROM PetDuties
        WHERE duty_id =? 
    )
    WHERE user_id = ? ;
    `;

    const VALUES = [data.duty_id, data.user_id];
    pool.query(SQLSTATEMENT, VALUES, callback);
}


// ##############################################################
// DELETE
// ##############################################################

// ~ ~ ~ ~ PET DETAILS ~ ~ ~ ~

//model to delete pet by pet id 
module.exports.delByPetId = (data, callback) => {
    const SQLSTATEMENT = `
    DELETE FROM Pet
    WHERE pet_id =? ;
    
    ALTER TABLE Pet AUTO_INCREMENT = 1; 
    `;

    const VALUES = [data.pet_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}