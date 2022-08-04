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
exports.typeController = void 0;
const database_1 = require("../database");
class TypeController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const result = yield database_1.pool.query('INSERT INTO type (name) VALUES ($1)', [name]);
            res.json({ message: `${name} type was created successfully` });
        });
        this.getTypes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query('SELECT * FROM type');
            res.json(result.rows);
        });
        this.selectedTypeId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const selected = yield database_1.pool.query('SELECT * FROM type WHERE id = $1', [id]);
            res.json(selected.rows);
        });
        this.updateType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name } = req.body;
            yield database_1.pool.query('UPDATE type SET name = $1 WHERE id = $2', [name, id]);
            res.json({ message: `${name} type was updated successfully` });
        });
        this.deleteType = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.pool.query('DELETE FROM type WHERE id = $1', [id]);
            res.json({ message: `Type ${id} was deleted successfully` });
        });
    }
}
exports.typeController = new TypeController();
