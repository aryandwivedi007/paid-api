import { AppDataSource } from '../common/services/database.service'
import { User } from './user.schema';

export const UserRepository = AppDataSource.getRepository(User);
