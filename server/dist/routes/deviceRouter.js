"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deviceController_1 = require("../controller/deviceController");
// Initialize the router
const deviceRouter = (0, express_1.Router)();
//Define brand routes
deviceRouter.post('/', deviceController_1.deviceController.createDevice);
deviceRouter.get('/', deviceController_1.deviceController.getDevices);
deviceRouter.get('/:id', deviceController_1.deviceController.getDeviceById);
deviceRouter.put('/:id', deviceController_1.deviceController.updateDevice);
deviceRouter.delete('/:id', deviceController_1.deviceController.deleteDevice);
exports.default = deviceRouter;
