import {Router} from "express";
import { SendForgotPasswordEmailController } from "../../../../modules/accounts/useCases/sendForgotPasswordEmail/sendForgotPasswordEmailController";


const passwordRouter = Router();
const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();

passwordRouter.post("/forgot", sendForgotPasswordEmailController.handle);

export { passwordRouter }