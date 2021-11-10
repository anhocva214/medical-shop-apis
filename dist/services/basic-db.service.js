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
const user_model_1 = require("@models/user.model");
class BasicDBService {
    constructor() {
        this.model = user_model_1.UserModel;
    }
    create(object) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.create(object);
                return true;
            }
            catch (err) {
                console.log("create err: ", err);
                return false;
            }
        });
    }
    getList() {
        return __awaiter(this, void 0, void 0, function* () {
            let objects = yield this.model.find();
            return objects;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.deleteOne({ id });
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    update(filterObj, dataUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.updateOne(filterObj, dataUpdate);
                return true;
            }
            catch (err) {
                return false;
            }
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
            let obj = yield this.model.findOne(objQuery);
            return obj._doc;
        });
    }
}
exports.default = BasicDBService;
