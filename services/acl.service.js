const bcrypt = require('bcrypt');
const db = require("../database/db");

const testFunction = () => {
    return { success: true, message: "Reached" };
}

/*
    ROLES :- 
       1 : Admin
       2 : Seller
       3 : suppporter
       4 : customer 
*/

const createPassword = async (password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
}

const registerUser = async (userInfo) => {
    try {
        let { username, password, role } = userInfo;
        password = await createPassword(password);
        const result = await db.connection.query(`insert into Users(name, password, role) values (?,?,?)`, [username, password, role]);
        return { success: true, message: "user registered successfully" };
    }
    catch (err) {
        console.error("Error while registering user", err);
        return { success: false, message: "user could not be registered" };
    }
}

const loginUser = async (userInfo) => {
    let customError = false;
    try {
        const { username, password } = userInfo;
        const result = await db.connection.query(`select * from Users where name = ?`, [username]);
        const rowInfo = result[0][0];
        if (!rowInfo) {
            customError = true;
            throw "Invalid username";
        }

        const isPasswordCorrect = await bcrypt.compare(password, rowInfo.password);

        if (!isPasswordCorrect) {
            customError = true;
            throw "Invalid password";
        }

        return { success: true, userDetails: { id: rowInfo.id, role: rowInfo.role }, message: "user is logged in!" };
    }
    catch (err) {
        console.error("Error while logging the user", err);
        let message = "user could not be logged in";
        if (customError) {
            message = err;
        }
        return {
            success: false, message
        };
    }
}

module.exports = { testFunction, registerUser, loginUser };