import { container } from "tsyringe";
import { IDateProvider } from "./dateProvider/IDateProvider";
import { DayjsDateProvider } from "./dateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./mailProvider/IMailProvider";
import { EtherealEmailProvider } from "./mailProvider/implementations/EtherealEmailProvider";
import { LocalStorageProvider } from "./storageProvider/implementations/LocalStorageProvider";
import { S3StorageProvider } from "./storageProvider/implementations/S3StorageProvider";
import { IStorageProvider } from "./storageProvider/IStorageProvider";


container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)

container.registerSingleton<IMailProvider>(
    "EtherealEmailProvider",
    EtherealEmailProvider
)

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider
}

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    diskStorage[process.env.DISK]
)