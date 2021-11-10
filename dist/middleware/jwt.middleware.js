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
exports.adminMiddleware = exports.userMiddleware = void 0;
const jwt_service_1 = require("@services/jwt.service");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { UNAUTHORIZED } = http_status_codes_1.default;
const user_service_1 = __importDefault(require("@services/user.service"));
const admin_service_1 = __importDefault(require("@services/admin.service"));
function userMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let authorization = req.headers.authorization;
        if (!authorization)
            return res.status(UNAUTHORIZED).send({ message: "Access token is required" });
        let accessToken = authorization.split(" ")[1].trim();
        // console.log("access_token: ", accessToken)
        const jwtService = new jwt_service_1.JwtService();
        let data = jwtService.verifyJwt(accessToken);
        if (!data)
            return res.status(UNAUTHORIZED).send({ message: 'Access token invalid' });
        let userServive = new user_service_1.default();
        let user = yield userServive.findOne({ id: data.id });
        if (!user)
            return res.status(UNAUTHORIZED).send({ message: 'Access token invalid' });
        if (user.access_token != accessToken)
            return res.status(UNAUTHORIZED).send({ message: 'Access token does not match' });
        req.user = user;
        next();
    });
}
exports.userMiddleware = userMiddleware;
function adminMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let authorization = req.headers.authorization;
        if (!authorization)
            return res.status(UNAUTHORIZED).send({ message: "Access token is required" });
        let accessToken = authorization.split(" ")[1].trim();
        // console.log("access_token: ", accessToken)
        const jwtService = new jwt_service_1.JwtService();
        let data = jwtService.verifyJwt(accessToken);
        if (!data)
            return res.status(UNAUTHORIZED).send({ message: 'Access token invalid' });
        let adminService = new admin_service_1.default();
        let admin = yield adminService.findOne({ id: data.id });
        if (!admin)
            return res.status(UNAUTHORIZED).send({ message: 'Access token invalid' });
        if (admin.access_token != accessToken)
            return res.status(UNAUTHORIZED).send({ message: 'Access token does not match' });
        req.user = admin;
        next();
    });
}
exports.adminMiddleware = adminMiddleware;
