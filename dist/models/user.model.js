"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
const mongoose_1 = require("mongoose");
class User {
    constructor(obj) {
        this.id = (obj === null || obj === void 0 ? void 0 : obj.id) || "";
        this.email = (obj === null || obj === void 0 ? void 0 : obj.email) || "";
        this.password = (obj === null || obj === void 0 ? void 0 : obj.password) || "";
        this.fullname = (obj === null || obj === void 0 ? void 0 : obj.fullname) || "";
        this.gender = (obj === null || obj === void 0 ? void 0 : obj.gender) || -1;
        this.career = (obj === null || obj === void 0 ? void 0 : obj.career) || "";
        this.wishlist = (obj === null || obj === void 0 ? void 0 : obj.wishlist) || [];
        this.access_token = (obj === null || obj === void 0 ? void 0 : obj.access_token) || "";
    }
}
exports.User = User;
const userSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: String,
    gender: Number,
    career: String,
    wishlist: [String],
    access_token: String,
});
exports.UserModel = mongoose_1.model('User', userSchema);
