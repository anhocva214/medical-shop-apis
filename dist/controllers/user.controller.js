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
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY, BAD_REQUEST } = http_status_codes_1.default;
const user_model_1 = require("@models/user.model");
const functions_1 = require("@shared/functions");
const uuid_1 = require("uuid");
const jwt_service_1 = require("@services/jwt.service");
const user_service_1 = __importDefault(require("@services/user.service"));
const validate_service_1 = require("@services/validate.service");
class UserController {
    constructor() {
        this.user = new user_model_1.User();
        this.userServive = new user_service_1.default();
        this.jwtService = new jwt_service_1.JwtService();
    }
    // Regiser new user
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = new user_model_1.User(req.body);
            let userValidate = new validate_service_1.ValidateService(user);
            let errorsRegister = userValidate.formRegister();
            // console.log(Object.keys(errorsRegister))
            if (Object.keys(errorsRegister).length > 0)
                return res.status(BAD_REQUEST).send({ message: "Regsiter failed", errors: errorsRegister });
            if (yield this.userServive.isExists({ email: user.email })) {
                return res.status(BAD_REQUEST).send({ message: "Register failed", errors: [{ email: 'Email is exists' }] });
            }
            user.id = uuid_1.v1();
            user.password = functions_1.HashMD5(user.password);
            // console.log(user)
            yield this.userServive.create(user);
            return res.status(OK).send({ message: "Register successfully" });
        });
    }
    // Login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let form = req.body;
            if (!form.username || !form.password)
                return res.status(BAD_REQUEST).send({ message: "Username/Password invalid" });
            let user = yield this.userServive.findOne({ username: form.username });
            if (!user)
                return res.status(BAD_REQUEST).send({ message: "Username/Password invalid" });
            if (user.password != functions_1.HashMD5(form.password))
                return res.status(BAD_REQUEST).send({ message: "Username/Password invalid" });
            user.access_token = yield this.jwtService.generateJwt(user);
            yield this.userServive.update(user);
            return res.status(OK).send({ message: "Login successfully", data: user });
        });
    }
    // logout
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.user;
            user.access_token = "";
            yield this.userServive.update(user);
            return res.status(OK).send({ message: "Logout successfully" });
        });
    }
    // check access token
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(OK).send({ data: req.user });
        });
    }
    // update info
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.user = new user_model_1.User(req.body);
            this.user.id = req.user.id;
            if (!this.user.email)
                return res.status(BAD_REQUEST).send({ message: "Email invalid", error_form: "Email không được để trống" });
            let user_query = yield this.userServive.findOne({ email: this.user.email });
            if (user_query.email != req.user.email)
                return res.status(BAD_REQUEST).send({ message: "Email is exists", error_form: "Email đã tồn tại" });
            if (!!req.body.new_password) {
                this.user.password = functions_1.HashMD5(req.body.new_password);
            }
            else
                this.user.password = req.user.password;
            yield this.userServive.update(this.user);
            return res.status(OK).send({ message: "Update successfully", data: this.user });
        });
    }
}
exports.default = UserController;
