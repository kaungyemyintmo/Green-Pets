// ##############################################################
// IMPORTING PET MODEL 
// ##############################################################
const petModel = require("../models/petModel.js");


// ##############################################################
// DEFINE FUNCTIONS TO PERFORM API REQUESTS 
// ##############################################################


// ##############################################################
// GET REQUESTS 
// ##############################################################

// ~ ~ ~ ~ PET DUTIES ~ ~ ~ ~

//to read all pet duties 
module.exports.readAllDuties = (req, res, next) => {
    const callback = (error, result, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(200).json(result);
        }
    }
    petModel.selectAllDuties(callback);
}

//read pet duties by duty id
module.exports.readDutyById = (req, res, next) => {

    const data = {
        duty_id: req.params.duty_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.length == 0) {
                res.status(404).json( "Error: Duty not found."
                );
            }
            else {
                res.status(201).json(results);
            }
        }
    }
    petModel.selectDutyById(data, callback);
}

// ~ ~ ~ ~ RANKING ~ ~ ~ ~

// rank pets by their levels
module.exports.petRanking = (req, res, next) => {

    const callback = (error, results, fields) => {
        if (error) {
            res.status(404).json("Error : Error fetching top pets." );
        }
        else {
            res.status(200).json(results);
        }
    }
    petModel.petRank(callback);
}

// ~ ~ ~ ~ PET DETAILS ~ ~ ~ ~

//to read all pets 
module.exports.readAllPet = (req, res, next) => {
    const callback = (error, result, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(200).json(result);
        }
    }
    petModel.selectAll(callback);
}

// to read pet by its id 
module.exports.readPetByPetId = (req, res, next) => {

    const data = {
        store_id: req.params.store_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.length == 0) {
                res.status(404).json( "Error : Pet not found."
                );
            }
            else {
                res.status(201).json(results);
            }
        }
    }
    petModel.selectByPetId(data, callback);
}

//to read all pets owned by a user 
module.exports.readAllPetsByUserId = (req, res, next) => {

    const data = {
        user_id: res.locals.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.length == 0) {
                res.status(404).json( "Error : Pets owned by user not found."
                );
            }
            else {
                res.status(201).json(results);
            }
        }
    }
    petModel.selectPetsByUserId(data, callback);
}


module.exports.readOwnedPetsById = (req, res, next) => {

    const data = {
        pet_id: req.params.pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.length == 0) {
                res.status(404).json( "Error : Pet not found."
                );
            }
            else {
                res.status(201).json(results);
            }
        }
    }
    petModel.selectByPurchasedId(data, callback);
}

// ##############################################################
// POST REQUESTS 
// ##############################################################

// ~ ~ ~ ~ PET DETAILS ~ ~ ~ ~

//to create a new pet 
module.exports.createNewPetByUserId = (req, res, next) => {
    if (req.body.pet_name == undefined || req.body.color == undefined ||req.body.color == '' || req.body.pet_name == ''  ) {
        res.status(400).json("Error : Missing data");
        return;
    }

    const data = {
        store_id: req.params.store_id, 
        user_id: res.locals.id,
        pet_name: req.body.pet_name,
        color: req.body.color
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error 4");
        }
        else {
            res.status(201).json({
                message: `Pet successfully created.`
            });
        }
    }

    petModel.insertNew(data, callback);
}

// ##############################################################
// PUT REQUESTS 
// ##############################################################

// ~ ~ ~ ~ PET DETAILS ~ ~ ~ ~

//to update the pet details by id 
module.exports.updatePetByUserId = (req, res, next) => {
    if (req.body.pet_name == undefined || req.body.type == undefined || req.body.color == undefined) {
        res.status(400).json("Error : pet name, type or color is not defined"
        );
        return;
    }

    const data = {
        pet_id: req.params.pet_id,
        pet_name: req.body.pet_name,
        type: req.body.type,
        color: req.body.color
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        } else {
            if (results.affectedRows == 0) {
                res.status(404).json( "Error : Pet not found."
                );
            }
            else {
                res.status(200).json({
                    message: "Pet successfully updated."
                });
            }
        }
    }
    petModel.updatePetDetails(data, callback);
}

// ~ ~ ~ ~ PET DUTIES ~ ~ ~ ~

// to gain pet energies for performing duties 
module.exports.performDuties = (req, res, next) => {
    // in this controller, we are adding energies gained to the pet's energies by performing duties. 
    //therefore, we do not need user_id
    const data = {
        user_id: res.locals.id,
        pet_id: req.params.pet_id,
        duty_id: req.params.duty_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(200).json({ message: `User ${data.user_id} performed duty ${data.duty_id} successfully. Pet has gained energies!` })
        }
    }
    petModel.addEnergiesAfterDuty(data, callback);
}


// ~ ~ ~ ~ PET LEVEL ~ ~ ~ ~

// to level up 
module.exports.levelUpPetById = (req, res, next) => {

    // in this controller, we are leveling up the pet. 
    //therefore, we only need the pet id
    const data = {
        pet_id: req.params.pet_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            res.status(200).json({ message: `Pet ${data.pet_id} leveled up!` })
        }
    }
    petModel.updatePetLevel(data, callback);
}

// ##############################################################
// DELETE REQUESTS 
// ##############################################################

// ~ ~ ~ ~ PET DETAILS ~ ~ ~ ~

// to delete a pet by user id 
module.exports.delPetByUserId = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id,
        user_id: res.locals.id
    }

    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.affectedRows == 0) {
                res.status(404).json(
                    "Error : Pet owned by user not found"
                );
            }
            else {
                res.status(204).json({
                    message: `Pet successfully deleted.`
                }); //204 NO content 
            }
        }
    }
    petModel.delByPetId(data, callback);
}


// ##############################################################
// MIDDLEWEARS 
// ##############################################################

// ~ ~ ~ ~ EXISTENCE ~ ~ ~ ~

//middlewear to check if a user exists
module.exports.userExistence = (req, res, next) => {
    const data = {
        user_id: res.locals.id
    }
    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error 1");
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

    petModel.selectUserById(data, callback);

}

//middlewear to check if a pet exists
module.exports.petExistence = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id
    }
    const callback = (error, results, fields) => {
        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length == 0) {
                res.status(404).json("Error : Pet does not exist." );
            }
            else {
                next();
            }
        }
    }

    petModel.selectByPurchasedId(data, callback);

}
//middlewear to check if duty exists
module.exports.dutyExistence = (req, res, next) => {
    const data = {
        duty_id: req.params.duty_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length === 0) {
                res.status(404).json(`Error : Duty not found.` )
            }
            else {
                next();
            }
        }
    }
    petModel.selectDutyById(data, callback);
}



// ~ ~ ~ ~ CHECK SUFFICIENCY | CHECK ANSWER ~ ~ ~ ~

//middlewear to check if user has enough points to create a new pet 
module.exports.enoughPointsForPet = (req, res, next) => {

    const data = {
        store_id : req.params.store_id,
        user_id: res.locals.id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length === 0) {
                res.status(400).json( `Insufficient points.`)
            }
            else {
                next();
            }
        }
    }
    petModel.enoughPetPoints(data, callback);
}

//middlewear to check if user has enough points to create a new pet 
module.exports.enoughDutyPoints = (req, res, next) => {

    const data = {
        user_id: res.locals.id,
        duty_id : req.params.duty_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length === 0) {
                res.status(400).json(`Error : Insufficient points for this duty.` )
            }
            else {
                next();
            }
        }
    }
    petModel.enoughPointsForDuty(data, callback);
}

//middlewear to check if pet has enough energies to level up 
module.exports.enoughEnergyToLevelUp = (req, res, next) => {

    const data = {
        pet_id: req.params.pet_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length === 0) {
                res.status(400).json(`Error : Insufficient pet energies to level up.` )
            }
            else {
                next();
            }
        }
    }
    petModel.selectEnergiesById(data, callback);
}

// ~ ~ ~ ~ CHECK OWNERSHIP ~ ~ ~ ~

//middlewear to check if a user owns a pet 
module.exports.petOwnership = (req, res, next) => {

    const data = {
        pet_id: req.params.pet_id,
        user_id: res.locals.id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results[0]["user_id"] == data.user_id) {
                next(); //imp***
            }
            else {
                res.status(403).json("Error : Pet not owned by user.");
                //error 403 forbidden client is not authorized
            }
        }
    }
    petModel.petOwner(data, callback);
}

// ~ ~ ~ ~ DEDUCT POINTS ~ ~ ~ ~

//middlewear to deduct points when buying pet 
module.exports.deductPointsForPet = (req, res, next) => {
    const data = {
        user_id:res.locals.id,
        store_id: req.params.store_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error 3");
        }
        else {
            if (results.length === 0) {
                res.status(400).json(`Error : Insufficient points.` );
            }
            else {
                next();
            }
        }
    }
    petModel.deductPointsWhenBuyingPet(data, callback);
}

//middlewear to deduct energies when pet levels up 
module.exports.deductEnergiesForLevel = (req, res, next) => {
    const data = {
        pet_id: req.params.pet_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length === 0) {
                res.status(400).json(`Error : Insufficient pet energies to level up.`)
            }
            else {
                next();
            }
        }
    }
    petModel.deductPetEnergies(data, callback);
}

//middlewear to deduct points when performing pet duties
module.exports.deductPointsForDuty = (req, res, next) => {
    // in this controller, we are deducting points from the user according to the duty 
    //therefore, we do not need pet_id
    const data = {
        user_id: res.locals.id, 
        duty_id: req.params.duty_id
    }

    const callback = (error, results, fields) => {

        if (error) {
            return res.status(500).json("Error : Internal Server Error");
        }
        else {
            if (results.length === 0) {
                res.status(400).json(`Error : Insufficient points for this duty.` );
            }
            else {
                next();
            }
        }
    }
    petModel.deductPointsWhenDuty(data, callback);
}

