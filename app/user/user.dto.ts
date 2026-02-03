import { BaseSchema } from "../common/dto/base.dto";

export interface UserSchema extends BaseSchema {
    name: string;
    email: string;
    password?: string;
    role: Role;
    googleId?: string;
    provider: ProviderType;
}

export enum ProviderType {
    GOOGLE = "google",
    LOCAL = "local",
}

export enum Role {
    ADMIN = "admin",
    USER = "user",
}

