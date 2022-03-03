import { Request, Response } from "express";
import { CreateEncryptService } from "../services/CreateEncryptService";
import { ReadEncryptService } from "../services/ReadEncryptService";

export class EncryptController {
    async create(request: Request, response: Response) {
        const { userId, description, originalContent } = request.body;
        const service = new CreateEncryptService();
        const result = await service.execute({ userId, description, originalContent });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
    async find(request: Request, response: Response) {
        const { _id } = request.body;
        const service = new ReadEncryptService();
        const result = await service.execute({ _id });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}