"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
class Form {
    constructor(obj) {
        this.id = (obj === null || obj === void 0 ? void 0 : obj.id) || "";
        this.email = (obj === null || obj === void 0 ? void 0 : obj.email) || "";
        this.password = (obj === null || obj === void 0 ? void 0 : obj.password) || "";
        this.fullname = (obj === null || obj === void 0 ? void 0 : obj.fullname) || "";
        this.gender = (obj === null || obj === void 0 ? void 0 : obj.gender) || null;
        this.career = (obj === null || obj === void 0 ? void 0 : obj.career) || "";
    }
}
exports.Form = Form;
