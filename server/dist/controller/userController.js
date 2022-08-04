"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const errorHandler_1 = __importDefault(require("../errorHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../database");
const generateToken = (id, email, role) => {
    return jsonwebtoken_1.default.sign({ id, email, role }, process.env.SECRET_KEY, {
        expiresIn: '24h',
    });
};
class UserController {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role: providedRole } = req.body;
                if (!email || !password)
                    return next(errorHandler_1.default.badRequest('Email and password are required'));
                const { email: candidateEmail, } = yield database_1.pool.query('SELECT * FROM user_table WHERE email = $1', [email]);
                candidateEmail && next(errorHandler_1.default.badRequest('User already exists'));
                const hashedPassword = yield bcrypt_1.default.hash(password, 5);
                let newUser;
                if (providedRole) {
                    newUser = yield database_1.pool.query('INSERT INTO user_table (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *', [name, email, hashedPassword, providedRole]);
                }
                else {
                    newUser = yield database_1.pool.query('INSERT INTO user_table (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
                }
                const { id, role } = newUser.rows[0];
                yield database_1.pool.query('INSERT INTO basket (user_id) VALUES ($1) RETURNING *', [
                    id,
                ]);
                const token = generateToken(id, email, role);
                return res.status(201).json({
                    message: 'User created',
                    token,
                    user: newUser.rows[0].email,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return next(errorHandler_1.default.badRequest(error.message));
                }
                return console.log(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return next(errorHandler_1.default.badRequest('Email and password are required'));
            }
            const user = yield database_1.pool.query('SELECT * FROM user_table WHERE email = $1', [
                email,
            ]);
            if (!user.rows[0]) {
                return next(errorHandler_1.default.badRequest('User not found'));
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, user.rows[0].password);
            if (!isPasswordValid) {
                return next(errorHandler_1.default.badRequest('Invalid credentials'));
            }
            const token = generateToken(user.rows[0].id, user.rows[0].email, user.rows[0].role);
            return res.status(200).json({
                message: 'User logged in',
                token,
                user: user.rows[0].email,
            });
        });
        this.checkAuth = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const token = generateToken(req.body.id, req.body.email, req.body.role);
            return res.status(200).json({ token });
        });
    }
}
exports.userController = new UserController();
