"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("@controllers/user.controller"));
const jwt_middleware_1 = require("@middleware/jwt.middleware");
const admin_controller_1 = __importDefault(require("@controllers/admin.controller"));
const product_controller_1 = __importDefault(require("@controllers/product.controller"));
const category_controller_1 = __importDefault(require("@controllers/category.controller"));
const userController = new user_controller_1.default();
const adminController = new admin_controller_1.default();
const productController = new product_controller_1.default();
const categoryController = new category_controller_1.default();
// User Route
const userRouter = express_1.Router();
userRouter.post('/register', userController.register.bind(userController));
userRouter.post('/login', userController.login.bind(userController));
userRouter.get('/logout', jwt_middleware_1.userMiddleware, userController.logout.bind(userController));
userRouter.get('/authenticate', jwt_middleware_1.userMiddleware, userController.authenticate.bind(userController));
userRouter.post('/update', jwt_middleware_1.userMiddleware, userController.update.bind(userController));
// Admin Account Route
const adminAccountRouter = express_1.Router();
adminAccountRouter.post('/create', adminController.create.bind(adminController));
adminAccountRouter.post('/login', adminController.login.bind(adminController));
adminAccountRouter.get('/authenticate', jwt_middleware_1.adminMiddleware, adminController.authenticate.bind(adminController));
// Product Route
const productRouter = express_1.Router();
productRouter.get('/list', productController.getAll.bind(productController));
productRouter.post('/create', jwt_middleware_1.adminMiddleware, productController.create.bind(productController));
productRouter.post('/update', jwt_middleware_1.adminMiddleware, productController.updateInfo.bind(productController));
productRouter.post("/delete", jwt_middleware_1.adminMiddleware, productController.delete.bind(productController));
// Category Route
const categoryRouter = express_1.Router();
categoryRouter.post("/create", jwt_middleware_1.adminMiddleware, categoryController.create.bind(categoryController));
categoryRouter.get('/list', categoryController.getAll.bind(categoryController));
categoryRouter.post('/delete', jwt_middleware_1.adminMiddleware, categoryController.delete.bind(categoryController));
// Export the base-router
const baseRouter = express_1.Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/admin/account', adminAccountRouter);
baseRouter.use('/product', productRouter);
baseRouter.use('/categories', categoryRouter);
exports.default = baseRouter;
