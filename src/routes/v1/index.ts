import { Router } from 'express';
import UserController from '@controllers/user.controller';
import {adminMiddleware, userMiddleware} from '@middleware/jwt.middleware';
import AdminController from '@controllers/admin.controller';



// User-route
const userRouter = Router();
const userController = new UserController();
userRouter.post('/register', userController.register.bind(userController));
userRouter.post('/login', userController.login.bind(userController));
userRouter.get('/logout', userMiddleware, userController.logout.bind(userController));
userRouter.get('/authenticate', userMiddleware, userController.authenticate.bind(userController));
userRouter.post('/update', userMiddleware, userController.update.bind(userController));


// AdminAccount-route
const adminController = new AdminController();

const adminAccountRouter = Router();
adminAccountRouter.post('/create', adminController.create.bind(adminController));
adminAccountRouter.post('/login', adminController.login.bind(adminController));
adminAccountRouter.get('/authenticate', adminMiddleware, adminController.authenticate.bind(adminController));



// Export the base-router
const baseRouter = Router();
baseRouter.use('/user', userRouter);
baseRouter.use('/admin/account', adminAccountRouter);




export default baseRouter;