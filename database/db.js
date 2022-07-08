import { client } from "../index.js";

async function doesUserExist(username) {
    return await client.db("app_crm").collection("users").findOne({ username: username });
}

async function createUser(data) {
    return await client.db("app_crm").collection("users").insertOne(data);
}

async function doesEmailIdExist(email) {
    return await client.db("app_crm").collection("users").findOne({ email: email });
}

async function saveRandomTokenInDb(user, randomtoken) {
    return await client.db("app_crm").collection("users").findOne({ email: user.email, randomToken: randomtoken });
}

async function findUserByRandomToken(token) {
    return await client.db("app_crm").collection("users").findOne({ randomToken: token });
}

export { doesUserExist, createUser, doesEmailIdExist, saveRandomTokenInDb, findUserByRandomToken };