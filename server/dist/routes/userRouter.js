"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
// Initialize the router
const userRouter = (0, express_1.Router)();
//Define brand routes
userRouter.post('/register', userController_1.userController.register);
userRouter.post('/login', userController_1.userController.login);
userRouter.get('/auth', authMiddleware_1.default, userController_1.userController.checkAuth);
exports.default = userRouter;
