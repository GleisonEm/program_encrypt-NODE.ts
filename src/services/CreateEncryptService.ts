import { getRepository } from "typeorm";
import { Encrypt } from "../entities/Encrypt";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";

dotenv.config();

type EncryptRequest = {
    description: string;
    originalContent: string;
};

export class CreateEncryptService {
    async execute({
        description,
        originalContent
    }: EncryptRequest): Promise<Encrypt | Error> {
        const repo = getRepository(Encrypt);

        if (await repo.findOne({ originalContent })) {
            return new Error('Já existe um conteúdo desse encryptado');
        }

        var encrypted = CryptoJS.AES.encrypt(originalContent, process.env.PRIVATE_KEY).toString();
        const encrypt = repo.create({
            description,
            encrypted,
            originalContent
        });

        await repo.save(encrypt);

        return encrypt;
    }

}