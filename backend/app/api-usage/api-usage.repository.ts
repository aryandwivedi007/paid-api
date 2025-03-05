import { AppDataSource } from "../common/services/database.service";
import { ApiUsage } from "./api-usage.schema";

export const ApiUsageRepository=AppDataSource.getRepository(ApiUsage);