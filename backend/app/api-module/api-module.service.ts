import { IApiModule } from "./api-module.dto";
import { ApiModuleRepository } from "./api-module.repository";

/**
 * Creates a new API module.
 */
export const createApiModule = async (data: IApiModule) => {
  const newModule = ApiModuleRepository.create(); // Create an empty instance
  newModule.name = data.name; // Manually assign properties
  newModule.isFree = data.isFree;
  newModule.pricePerRequest = data.pricePerRequest; // Use the setter

  const saved = await ApiModuleRepository.save(newModule);
  console.log("Saved ApiModule:", JSON.stringify(saved, null, 2));
  return saved;
};

/**
 * Updates an existing API module.
 */
export const updateApiModule = async (
  id: string,
  data: Partial<IApiModule>
) => {
  const apiModule = await ApiModuleRepository.findOne({ where: { id } });
  if (!apiModule) throw new Error("API Module not found");

  Object.assign(apiModule, data);
  await ApiModuleRepository.save(apiModule);
  return apiModule;
};

/**
 * Deletes an API module by ID.
 */
export const deleteApiModule = async (id: string) => {
  return await ApiModuleRepository.delete(id);
};

/**
 * Gets an API module by ID.
 */
export const getApiModuleById = async (id: string) => {
  return await ApiModuleRepository.findOne({ where: { id } });
};

/**
 * Gets all API modules.
 */
export const getAllApiModules = async () => {
  return await ApiModuleRepository.find();
};
