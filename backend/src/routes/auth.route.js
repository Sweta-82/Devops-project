import express from 'express';
import { getMeController, logoutUserController, registerUserController } from '../controller/auth.controller.js';
import { loginUserController } from '../controller/auth.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';
const authRouter= express.Router();

/**
 * @routes POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController)

/**
 * @route POST /api/auth/login
 * @description login user with email and password
 * @access Public
 */
authRouter.post("/login",loginUserController)


/**
 * @route GET /api/auth/logout
 * @description Logout a user by clearing the token cookie and adding the token to the blacklist
 * @access Public
 */

authRouter.get("/logout",logoutUserController)
export default authRouter;


/**
 * @route GET /api/auth/getme
 * @description Get the currently logged in user's information
 * @access Private
 */
authRouter.get("/get-me",authUser, getMeController)