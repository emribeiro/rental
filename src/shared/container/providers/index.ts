import { container } from "tsyringe";
import { IDateProvider } from "./dateProvider/IDateProvider";
import { DayjsDateProvider } from "./dateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "./mailProvider/IMailProvider";
import { EtherealEmailProvider } from "./mailProvider/implementations/EtherealEmailProvider";


container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)

container.registerSingleton<IMailProvider>(
    "EtherealEmailProvider",
    EtherealEmailProvider
)