"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const brandController_1 = require("../controller/brandController");
// Initialize the brandRouter
const brandRouter = (0, express_1.Router)();
//Define brand routes
brandRouter.post('/', brandController_1.brandController.createBrand);
brandRouter.get('/', brandController_1.brandController.getBrands);
brandRouter.get('/:id', brandController_1.brandController.getBrandById);
brandRouter.put('/:id', brandController_1.brandController.updateBrand);
brandRouter.delete('/:id', brandController_1.brandController.deleteBrand);
exports.default = brandRouter;
