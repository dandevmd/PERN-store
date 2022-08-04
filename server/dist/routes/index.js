"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const typeRouter_1 = __importDefault(require("./typeRouter"));
const brandRouter_1 = __importDefault(require("./brandRouter"));
const deviceRouter_1 = __importDefault(require("./deviceRouter"));
// Initialize the router
const routes = (0, express_1.Router)();
//Define the routes
routes.use('/user', userRouter_1.default);
routes.use('/type', typeRouter_1.default);
routes.use('/brand', brandRouter_1.default);
routes.use('/device', deviceRouter_1.default);
exports.default = routes;
