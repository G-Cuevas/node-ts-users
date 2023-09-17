import { Request, Response } from "express";
import bcryptjs from 'bcryptjs';

import { User } from "./schemas/user-schema";
import { signJwt } from "../common/jwt/sign-jwt";


export const userRegister = async ( req: Request, res: Response ) => {
    const { body } = req;
    const { email, password } = body;

    const user = new User({ email, password });

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);
    
    await user.save();

    res.json(user);
}


export const userLogin = async ( req: Request, res: Response ) => {

    const { body } = req;
    const { email, password } = body;

    const user = await User.findOne({ email });
    const validPassword = bcryptjs.compareSync(password, user!.password);

    if (!validPassword) {
        return res.status(400).json({
            msg: 'Incorrect email or password'
        })
    }

    const payload = {
        uid: user!._id.toString()
    }

    const token = await signJwt(payload);

    res.json({ token });
}



