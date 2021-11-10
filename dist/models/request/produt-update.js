"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdateDTO = void 0;
class ProductUpdateDTO {
    constructor(obj) {
        this.name = (obj === null || obj === void 0 ? void 0 : obj.name) || "";
        this.description = (obj === null || obj === void 0 ? void 0 : obj.description) || "";
        this.price = (obj === null || obj === void 0 ? void 0 : obj.price) || "";
        this.categories = (obj === null || obj === void 0 ? void 0 : obj.categories) || "";
        this.timePublish = (obj === null || obj === void 0 ? void 0 : obj.timePublish) || null;
    }
}
exports.ProductUpdateDTO = ProductUpdateDTO;
