import { getRepository } from "typeorm";
import { Encrypt } from "../entities/Encrypt";
import CryptoJS from "crypto-js";
import * as dotenv from "dotenv";

dotenv.config();

type EncryptRequest = {
    _id: string;
};

export class ReadEncryptService {
    async execute({
        _id
    }: EncryptRequest): Promise<String | Error> {
        const repo = getRepository(Encrypt);
        const findEncrypted = await repo.findOne(_id);

        if (!findEncrypted) {
            return new Error('Não existe um conteúdo com esse identificador encryptado');
        }

        var decrypted = (CryptoJS.AES.decrypt(findEncrypted.encrypted, process.env.PRIVATE_KEY)).toString(CryptoJS.enc.Utf8);

        return decrypted;
    }
}