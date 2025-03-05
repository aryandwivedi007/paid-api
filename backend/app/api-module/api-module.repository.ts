import { AppDataSource } from "../common/services/database.service";
import { ApiModule } from "./api-module.schema";

export const ApiModuleRepository=AppDataSource.getRepository(ApiModule);