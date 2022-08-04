"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = __importDefault(require("./routes"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const path_1 = __importDefault(require("path"));
//Initialization of the server and middleware
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, express_fileupload_1.default)({}));
process.env.DIRECTORY_TO_SAVE_IMAGES &&
    app.use(express_1.default.static(path_1.default.resolve(process.env.DIRECTORY_TO_SAVE_IMAGES, 'static')));
//Importing the routes
app.use('/api', routes_1.default);
//Error handling
app.use(errorMiddleware_1.errorMiddleware);
//Starting the server
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
});
