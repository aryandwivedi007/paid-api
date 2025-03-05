import { User } from '../user/user.schema'
import { UserRepository } from "./user.repository";
import { createUserTokens } from "../common/services/passport-jwt.service";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from './user.dto';





export const login = async (data: { email: string; password: string }) => {
    const { email } = data; 
    const user = await UserRepository.findOne({
      where: { email },
      select: ["_id", "password", "role", "active", "name", "refreshToken"],
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }
  
    const { password, ...userWithoutPassword } = user;
    const tokens = createUserTokens(userWithoutPassword);
  
    await UserRepository.update(user._id, { refreshToken: tokens.refreshToken });
  
    return tokens;
  };

/**
 * Creates a new user.
 */
export const createUser = async (data: Partial<User>) => {
    const newUser = UserRepository.create({ ...data, active: true });
    await UserRepository.save(newUser);
    return newUser;
};

/**
 * Updates an existing user.
 */
export const updateUser = async (id: string, data: Partial<User>) => {
    const user = await UserRepository.findOne({ where: { _id: id } });
    if (!user) throw new Error("User not found");

    Object.assign(user, data);
    await UserRepository.save(user);
    return user;
};

/**
 * Deletes a user by ID.
 */
export const deleteUser = async (id: string) => {
    return await UserRepository.delete(id);
};

/**
 * Gets a user by ID.
 */
export const getUserById = async (id: string) => {
    return await UserRepository.findOne({ where: { _id: id } });
};

/**
 * Gets all users.
 */
export const getAllUsers = async () => {
    return await UserRepository.find();
};

export const getUserByEmail = async (email: string, withPassword = false) => {
    const selectFields = withPassword
        ? { _id: true, email: true, password: true, role: true, active: true }
        : { _id: true, email: true, role: true, active: true };

    return await UserRepository.findOne({ where: { email }, select: selectFields });
};


/**
 * Refreshes access tokens using a refresh token.
 */
export const refreshToken = async (refreshToken: string) => {
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET ?? "refreshsecret";
    if (!jwtRefreshSecret) throw new Error("JWT_SECRET is not defined");

    const decoded = jwt.verify(refreshToken, jwtRefreshSecret) as JwtPayload;
    if (!decoded || !decoded._id) throw new Error("Invalid refresh token");

    const user = await UserRepository.findOne({ where: { _id: decoded._id } });
    if (!user || user.refreshToken !== refreshToken) throw new Error("Invalid refresh token");

    const { password, ...userWithoutPassword } = user;
    
    const tokens = createUserTokens(userWithoutPassword);

    user.refreshToken = tokens.refreshToken;
    await UserRepository.save(user);

    return tokens;
};

/**
 * Logs out a user by clearing the refresh token.
 */
export const logout = async (user: Omit<IUser, "password">) => {
    await UserRepository.update(user._id, { refreshToken: null });
};
