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
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandController = void 0;
const database_1 = require("../database");
class BrandController {
    constructor() {
        this.createBrand = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            yield database_1.pool.query('INSERT INTO brand (name) VALUES ($1)', [name]);
            res.json({ message: `${name} brand was created successfully` });
        });
        this.getBrands = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query('SELECT * FROM brand');
            res.json(result.rows);
        });
        this.getBrandById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield database_1.pool.query('SELECT * FROM brand WHERE id = $1', [id]);
            res.json(result);
        });
        this.updateBrand = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            yield database_1.pool.query('UPDATE brand SET name= $1 WHERE id = $2', [name, id]);
            res.json({ message: `The brand was updated successfully` });
        });
        this.deleteBrand = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            yield database_1.pool.query('DELETE FROM brand WHERE id = $1', [id]);
            res.json({ message: `The ${name} brand was deleted successfully` });
        });
    }
}
exports.brandController = new BrandController();
