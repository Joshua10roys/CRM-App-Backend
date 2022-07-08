import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import randomToken from 'random-token';
import { createUser, doesUserExist, doesEmailIdExist, saveRandomTokenInDb, findUserByRandomToken } from '../database/db.js'
import { sendPassResetMain } from '../helper/mail.js'
import session from 'cookie-session'

async function genHashPassword(password) {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

const registerUser = async function (req, res) {

    const { username, email, firstname, lastname, password, user_type } = req.body;

    const hashedPassword = await genHashPassword(password)

    if (await doesUserExist(username)) {
        res.status(409).send({ status: 409, msg: 'User name already exist' })
    } else {
        await createUser({
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword,
            userType: user_type
        })
        res.status(201).send({ status: 201, msg: 'New user Created Successfully' });
    }
}

const loginUser = async function (req, res) {

    const { username, password } = req.body;

    const userFromDB = await doesUserExist(username);

    if (!userFromDB) {
        res.status(401).send({ status: 401, msg: "Invalid Credentials" })
    } else {
        const storedPassword = userFromDB.password;
        const isPasswordMatch = await bcrypt.compare(password, storedPassword);
        const token = jwt.sign({ id: userFromDB._id }, process.env.PRIVATE_KEY);
        if (isPasswordMatch) {
            res.cookie('auth_token', token, { httpOnly: true, secure: true }).status(201).send({ status: 201, msg: "User login successful" });
        } else {
            res.status(401).send({ status: 401, msg: "Invalid Credentials" })
        }
    }
}

const forgotPassword = async function (req, res) {

    const { email } = req.body;

    const userFromDB = await doesEmailIdExist(email);

    if (!userFromDB) {
        res.status(401).send({ msg: "email id does not exist" })
    } else {
        const randomtoken = randomToken(16);
        const result = await sendPassResetMain(email = { email }, randomtoken = { randomtoken })
        const saveRandomToken = await saveRandomTokenInDb(user = { userFromDB }, randomtoken = { randomtoken })
        console.log(result);
    }

}

const passwordReset = async function (req, res) {

    const { email } = req.body;
    const randomToken = req.params.token;

    const user = await findUserByRandomToken(token);

}

export { registerUser, loginUser, forgotPassword, passwordReset };