import { Request, Response } from "express";
import { validationResult } from "express-validator";



export const validateProperties = (req: Request, res: Response, next: any) => {

    const errors: any = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.errors.map((error: any) => error.msg)
        return res.status(400).json({error: errorMessages})
    };

    next();
}