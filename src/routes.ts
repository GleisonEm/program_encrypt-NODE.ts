import { Router } from "express";
import { EncryptController } from "./controllers/EncryptController";

const routes = Router();

routes.post("/encrypt", new EncryptController().create);
routes.get("/encrypt", new EncryptController().find);

export { routes };