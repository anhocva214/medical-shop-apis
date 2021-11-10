"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = exports.Admin = void 0;
const mongoose_1 = require("mongoose");
class Admin {
    constructor(obj) {
        this.id = (obj === null || obj === void 0 ? void 0 : obj.id) || "";
        this.username = (obj === null || obj === void 0 ? void 0 : obj.username) || "";
        this.password = (obj === null || obj === void 0 ? void 0 : obj.password) || "";
        this.email = (obj === null || obj === void 0 ? void 0 : obj.email) || "";
        this.access_token = (obj === null || obj === void 0 ? void 0 : obj.access_token) || "";
    }
}
exports.Admin = Admin;
const adminSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    access_token: String,
});
exports.AdminModel = mongoose_1.model('Admin', adminSchema);
