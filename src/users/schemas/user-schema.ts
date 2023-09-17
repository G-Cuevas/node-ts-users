import { Schema, model } from "mongoose";

interface IUser {
    username: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: [true, 'email required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password required']
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export const User = model<IUser>('User', UserSchema);