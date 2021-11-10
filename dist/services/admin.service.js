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
Object.defineProperty(exports, "__esModule", { value: true });
const admin_model_1 = require("@models/admin.model");
class AdminService {
    constructor() {
        this.model = admin_model_1.AdminModel;
    }
    create(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.create(admin, (err, data) => {
                if (err)
                    console.log("AdminService -> create: ", err);
            });
        });
    }
    getList() {
        return __awaiter(this, void 0, void 0, function* () {
            let admins = yield this.model.find();
            return admins;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.deleteOne({ id });
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.updateOne({ id: user.id }, user);
        });
    }
    isExists(objQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = yield this.model.findOne(objQuery);
            if (!!query)
                return true;
            else
                return false;
        });
    }
    findOne(objQuery) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.model.findOne(objQuery);
            return user;
        });
    }
}
exports.default = AdminService;
