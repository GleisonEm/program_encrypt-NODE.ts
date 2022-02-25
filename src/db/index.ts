import { createConnection } from 'typeorm';
import * as dotenv from "dotenv";
import { Encrypt } from "../entities/Encrypt";

dotenv.config();

createConnection({
    type: "mongodb",
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    database: process.env.TYPEORM_DATABASE,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    authSource: "admin",
    entities: [Encrypt]
});