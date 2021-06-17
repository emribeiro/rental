import {Router} from "express";
import { ResetUserPasswordController } from "../../../../modules/accounts/useCases/resetUserPassword/resetUserPasswordController";
import { SendForgotPasswordEmailController } from "../../../../modules/accounts/useCases/sendForgotPasswordEmail/sendForgotPasswordEmailController";


const passwordRouter = Router();
const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRouter.post("/forgot", sendForgotPasswordEmailController.handle);
passwordRouter.post("/reset", resetUserPasswordController.handle);
export { passwordRouter }