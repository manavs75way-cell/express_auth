import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserSchema, Role, ProviderType } from "./user.dto";

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}

const userSchema = new mongoose.Schema<UserSchema>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {
        type: String,
        required: function (this: any) { return this.provider === ProviderType.LOCAL; }
    },
    role: { type: String, enum: Role, required: true },
    googleId: { type: String },
    provider: { type: String, enum: ProviderType, default: ProviderType.LOCAL, required: true },
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (this.isModified("password") && this.password) {
        this.password = await hashPassword(this.password);
    }
});


export const UserModel = mongoose.model<UserSchema>("User", userSchema);
