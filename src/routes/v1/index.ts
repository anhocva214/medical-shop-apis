import { Router } from 'express';
import UserController from '@controllers/user.controller';
import {adminMiddleware, userMiddleware} from '@middleware/jwt.middleware';
import AdminController from '@controllers/admin.controller';
import ProductController from '@controllers/product.controller';
import CategoryController from '@controllers/category.controller';



const userController = new UserController();
const adminController = new AdminController();
const productController = new ProductController();
const categoryController = new CategoryController();


// User Route
const userRouter = Router();
userRouter.post('/register', userController.register.bind(userController));
userRouter.post('/login', userController.login.bind(userController));
userRouter.get('/logout', userMiddleware, userController.logout.bind(userController));
userRouter.get('/authenticate', userMiddleware, userController.authenticate.bind(userController));
userRouter.post('/update', userMiddleware, userController.update.bind(userController));



// Admin Account Route
const adminAccountRouter = Router();
adminAccountRouter.post('/create', adminController.create.bind(adminController));
adminAccountRouter.post('/login', adminController.login.bind(adminController));
adminAccountRouter.get('/authenticate', adminMiddleware, adminController.authenticate.bind(adminController));


// Product Route
const productRouter = Router();
productRouter.get('/list', productController.getAll.bind(productController));
productRouter.post('/create',adminMiddleware, productController.create.bind(productController));
productRouter.post('/update/info', productController.updateInfo.bind(productController));
productRouter.post("/delete", adminMiddleware, productController.delete.bind(productController));


// Category Route
const categoryRouter = Router();
categoryRouter.post("/create", adminMiddleware, categoryController.create.bind(categoryController));
categoryRouter.get('/list', categoryController.getAll.bind(categoryController));
categoryRouter.post('/delete', adminMiddleware, categoryController.delete.bind(categoryController));



// Export the base-router
const baseRouter = Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/admin/account', adminAccountRouter);
baseRouter.use('/product', productRouter)
baseRouter.use('/categories', categoryRouter)





export default baseRouter;