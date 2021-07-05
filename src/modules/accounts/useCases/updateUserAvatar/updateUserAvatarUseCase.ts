import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/storageProvider/IStorageProvider";
import { IUserRepository } from "../../repository/IUserRepository";

interface IRequest{
    user_id: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase{

    constructor(
        @inject("UserRepository")
        private userRepository : IUserRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ){}

    async execute({user_id, avatarFile} : IRequest): Promise<void>{
        
        const user = await this.userRepository.findById(user_id);

        if(user.avatar){
            await this.storageProvider.delete(user.avatar, "avatar");
        }

        await this.storageProvider.save(avatarFile, "avatar");

        
        user.avatar = avatarFile;

        await this.userRepository.create(user);
    }

}

export { UpdateUserAvatarUseCase }