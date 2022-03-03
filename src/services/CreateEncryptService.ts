import { getRepository } from "typeorm";
import { Encrypt } from "../entities/Encrypt";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";

dotenv.config();

type EncryptRequest = {
    userId: string;
    description: string;
    originalContent: string;
};

export class CreateEncryptService {
    async execute({
        userId,
        description,
        originalContent
    }: EncryptRequest): Promise<Encrypt | Error> {
        const encryptRepository = getRepository(Encrypt);

        if (await encryptRepository.findOne({ originalContent })) {
            return new Error('Já existe um conteúdo desse encryptado');
        }

        var encrypted = CryptoJS.AES.encrypt(originalContent, process.env.PRIVATE_KEY).toString();
        const encrypt = encryptRepository.create({
            userId: userId,
            description,
            encrypted,
            originalContent
        });

        await encryptRepository.save(encrypt);

        return encrypt;
    }

}