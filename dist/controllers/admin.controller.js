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
const { UNAUTHORIZED, CREATED, OK, BAD_GATEWAY, BAD_REQUEST } = http_status_codes_1.default;
const admin_model_1 = require("@models/admin.model");
const functions_1 = require("@shared/functions");
const uuid_1 = require("uuid");
const jwt_service_1 = require("@services/jwt.service");
const admin_service_1 = __importDefault(require("@services/admin.service"));
class AdminController {
    constructor() {
        this.admin = new admin_model_1.Admin();
        this.adminService = new admin_service_1.default();
        this.jwtService = new jwt_service_1.JwtService();
    }
    // create new admin
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = new admin_model_1.Admin(req.body);
            // console.log(admin)
            if (!admin.username || !admin.password || !req.body.code)
                return res.status(BAD_REQUEST).send({ message: "Info invalid" });
            if (req.body.code != "122112")
                return res.status(UNAUTHORIZED).send({ message: "Code is wrong" });
            if (yield this.adminService.isExists({ username: admin.username }))
                return res.status(BAD_REQUEST).send({ message: "Username is exists" });
            admin.id = uuid_1.v1();
            admin.password = functions_1.HashMD5(admin.password);
            this.adminService.create(admin);
            return res.status(OK).send({ message: "Create admin successfully" });
        });
    }
    // login
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin = new admin_model_1.Admin(req.body);
            if (!(yield this.adminService.isExists({ username: admin.username, password: functions_1.HashMD5(admin.password) })))
                return res.status(UNAUTHORIZED).send({ message: "Login fail" });
            admin = yield this.adminService.findOne({ username: admin.username });
            admin.access_token = yield this.jwtService.generateJwt(admin);
            this.adminService.update(admin);
            return res.status(OK).send({ message: "Login successfully", data: admin, token: {
                    access_token: admin.access_token,
                    expiresIn: 7 * 60 * 60 * 24
                } });
        });
    }
    // authenticate
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.admin = new admin_model_1.Admin(req.user);
            return res.status(OK).send({ data: this.admin, token: {
                    access_token: this.admin.access_token,
                    expiresIn: 7 * 60 * 60 * 24
                } });
        });
    }
}
exports.default = AdminController;
