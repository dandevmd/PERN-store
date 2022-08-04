"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const typeController_1 = require("../controller/typeController");
const checkRoleMiddleware_1 = require("../middlewares/checkRoleMiddleware");
// Initialize the router
const typeRouter = (0, express_1.Router)();
//Define brand routes
typeRouter.post('/', (0, checkRoleMiddleware_1.checkRole)('ADMIN'), typeController_1.typeController.create);
typeRouter.get('/', typeController_1.typeController.getTypes);
typeRouter.get('/:id', typeController_1.typeController.selectedTypeId);
typeRouter.put('/:id', (0, checkRoleMiddleware_1.checkRole)('ADMIN'), typeController_1.typeController.updateType);
typeRouter.delete('/:id', (0, checkRoleMiddleware_1.checkRole)('ADMIN'), typeController_1.typeController.deleteType);
exports.default = typeRouter;
