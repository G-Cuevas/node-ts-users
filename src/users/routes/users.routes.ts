import { Router } from "express";
import { check } from "express-validator";

import { validateProperties } from "../../common/middlewares/validate-properties";
import { userLogin, userRegister } from "../../users/users.controller";
import { confirmPasswords, findUserByEmail, uniqueEmail } from "../../users/users.validators";

const router = Router();

router.post('/register', [
    check('name', 'name must be at least 6 characters').isLength({ min: 6 }),
    check('email', 'email not valid').isEmail(),
    check('email').custom( uniqueEmail ),
    check('password', 'name must be at least 6 characters').isLength({ min: 6 }),
    check('confirmPassword').exists(),
    check('confirmPassword').custom( confirmPasswords ),
    validateProperties,
], userRegister
);

router.post('/login', [
    check('email', 'email is not valid').isEmail(),
    check('email').custom( findUserByEmail ),
    validateProperties,
], userLogin);

export default router;
