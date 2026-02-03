
import { UserSchema } from "./user.dto";
import { UserModel } from "./user.model";

export const createUser = async (user: UserSchema) => {
    const newUser = await UserModel.create(user);
    return newUser.toObject();
};

export const getUserByEmail = async (email: string) => {
    return await UserModel.findOne({ email }).lean();
};

export const getUserById = async (id: string) => {
    return await UserModel.findById(id).select("-password").lean();
};

export const updateUser = async (id: string, data: Partial<UserSchema>) => {
    return await UserModel.findByIdAndUpdate(id, data, { new: true }).select("-password").lean();
};

export const deleteUser = async (id: string) => {
    return await UserModel.findByIdAndDelete(id);
};