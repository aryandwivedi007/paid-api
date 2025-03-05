
import { type BaseSchema } from "../common/dto/base.dto";

export interface IUser extends BaseSchema {
        name: string;
        email: string;
        active?: boolean;
        refreshToken?: string | null;
        role: "USER" | "ADMIN";
        password: string
}