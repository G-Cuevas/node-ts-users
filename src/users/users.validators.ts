import { User } from "./schemas/user-schema"

export const uniqueEmail = async ( email: string = '' ) => {
    const user = await User.findOne({ email })
    if (user)  {
        throw new Error(`email '${email}' already registered.`);
    }
}

export const findUserById = async ( id: string = '' ) => {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`User with id ${id} does not exist`);
    }
}

export const findUserByEmail = async ( email: string = '' ) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error(`User with email ${email} does not exist`);
    }
}

export const confirmPasswords = async ( confirmPassword: string = '', { req }: any ) => {
    const { password } = req.body;
    if (password !== confirmPassword) {
        throw new Error(`passwords do not match`);
    }
}