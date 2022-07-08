import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { usersRouter } from './route/users.js';
import { serviceRouter } from './route/service.js'
import { contactRouter } from './route/contacts.js'
import { leadsRouter } from './route/leads.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

async function createConnection() {
    const client = new MongoClient(process.env.MONGO_URL);
    await client.connect();
    console.log("MongoDB is Connected");
    return client;
}
export const client = await createConnection();

app.use(cors())
app.use(cookieParser());
app.use(express.json());
app.use('/users', usersRouter);
app.use('/service', serviceRouter);
app.use('/contact', contactRouter);
app.use('/lead', leadsRouter);

app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))