import { Router } from "express";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "../../../../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";
import uploadConfig from "../../../../config/upload";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ProfileUserController } from "../../../../modules/accounts/useCases/profileUser/profileUserController";


const userRouter = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

userRouter.post("/", createUserController.handle);
userRouter.patch("/avatar"
                , ensureAuthenticated
                , uploadAvatar.single("avatar")
                , updateUserAvatarController.handle);

userRouter.get("/profile"
               , ensureAuthenticated
               , profileUserController.handle);
export { userRouter }

