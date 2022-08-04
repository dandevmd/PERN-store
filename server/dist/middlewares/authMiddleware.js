"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../errorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return next(errorHandler_1.default.unauthorized('No token provided'));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        return next(errorHandler_1.default.unauthorized('Invalid token'));
    }
};
exports.default = authMiddleware;
