"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorHandler_1 = __importDefault(require("../errorHandler"));
const errorMiddleware = (err, req, res, next) => {
    if (err instanceof errorHandler_1.default) {
        return res.status(err.status).json({ message: err.message });
    }
    return res.json({ message: 'Error not handled' });
};
exports.errorMiddleware = errorMiddleware;
