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
exports.deviceController = void 0;
const database_1 = require("../database");
const path_1 = __importDefault(require("path"));
const errorHandler_1 = __importDefault(require("../errorHandler"));
const uuid_1 = require("uuid");
class DeviceController {
    constructor() {
        this.createDevice = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, type_id, brand_id, rating } = req.body;
                const { img } = req.files;
                let fileName = (0, uuid_1.v4)() + '.jpg';
                img.mv(process.env.DIRECTORY_TO_SAVE_IMAGES &&
                    path_1.default.resolve(process.env.DIRECTORY_TO_SAVE_IMAGES, 'static', fileName));
                const device = yield database_1.pool.query('INSERT INTO device (name, price, rating, img, type_id, brand_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [name, price, rating, fileName, type_id, brand_id]);
                res.json(device.rows[0]);
            }
            catch (error) {
                if (error instanceof errorHandler_1.default) {
                    return next(errorHandler_1.default.badRequest(error.message));
                }
                return error;
            }
        });
        this.getDevices = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { type_id, brand_id, limit, page } = req.query;
            page = page || '1';
            limit = limit || '10';
            let offset = Number(page) * Number(limit) - Number(limit);
            let devices;
            try {
                if (!type_id && !brand_id) {
                    devices = yield database_1.pool.query('SELECT * FROM device LIMIT $1 OFFSET $2', [
                        Number(limit),
                        Number(offset),
                    ]);
                }
                if (type_id && !brand_id) {
                    devices = yield database_1.pool.query('SELECT * FROM device WHERE type_id = $1 LIMIT $2 OFFSET $3', [type_id, Number(limit), Number(offset)]);
                }
                if (!type_id && brand_id) {
                    devices = yield database_1.pool.query('SELECT * FROM device WHERE brand_id = $1  LIMIT $2 OFFSET $3', [brand_id, Number(limit), Number(offset)]);
                }
                if (type_id && brand_id) {
                    devices = yield database_1.pool.query('SELECT * FROM device WHERE type_id = $1 AND brand_id = $2 LIMIT $3 OFFSET $4', [type_id, brand_id, Number(limit), Number(offset)]);
                }
                res.json(devices.rows);
            }
            catch (error) {
                if (error instanceof errorHandler_1.default) {
                    return next(errorHandler_1.default.badRequest(error.message));
                }
                return error;
            }
        });
        this.getDeviceById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const device = yield database_1.pool.query('SELECT * FROM device WHERE id = $1', [
                    id,
                ]);
                res.json(device.rows[0]);
            }
            catch (error) {
                if (error instanceof errorHandler_1.default) {
                    return next(errorHandler_1.default.badRequest(error.message));
                }
                return error;
            }
        });
        this.updateDevice = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const device = yield database_1.pool.query('SELECT * FROM device WHERE id = $1', [
                    id,
                ]);
                let { name, price, type_id, brand_id, rating } = req.body;
                let fileName = (0, uuid_1.v4)() + '.jpg';
                if (req.files) {
                    const { img } = req.files;
                    img.mv(process.env.DIRECTORY_TO_SAVE_IMAGES &&
                        path_1.default.resolve(process.env.DIRECTORY_TO_SAVE_IMAGES, 'static', fileName));
                }
                if (!name)
                    name = device.rows[0].name;
                if (!price)
                    price = device.rows[0].price;
                if (!type_id)
                    type_id = device.rows[0].type_id;
                if (!brand_id)
                    brand_id = device.rows[0].brand_id;
                if (!rating)
                    rating = device.rows[0].rating;
                if (!fileName)
                    fileName = device.rows[0].img;
                const UpdatedDevice = yield database_1.pool.query(`UPDATE device SET name = $1, price = $2, rating = $3, img = $4, type_id = $5, brand_id = $6 WHERE id = $7 RETURNING *`, [name, price, rating, fileName, type_id, brand_id, id]);
                res.json(UpdatedDevice.rows[0]);
            }
            catch (error) {
                if (error instanceof errorHandler_1.default) {
                    return next(errorHandler_1.default.badRequest(error.message));
                }
                return error;
            }
        });
        this.deleteDevice = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield database_1.pool.query('DELETE FROM device WHERE id = $1', [id]);
                res.json({ message: 'Device deleted' });
            }
            catch (error) {
                if (error instanceof errorHandler_1.default) {
                    return next(errorHandler_1.default.badRequest(error.message));
                }
                return error;
            }
        });
    }
}
exports.deviceController = new DeviceController();
