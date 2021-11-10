"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = exports.Category = void 0;
const mongoose_1 = require("mongoose");
class Category {
    constructor(obj) {
        this.id = (obj === null || obj === void 0 ? void 0 : obj.id) || "";
        this.name = (obj === null || obj === void 0 ? void 0 : obj.name) || "";
        this.type = (obj === null || obj === void 0 ? void 0 : obj.type) || "";
        if ((obj === null || obj === void 0 ? void 0 : obj.slug) != "product" && (obj === null || obj === void 0 ? void 0 : obj.slug) == "blog")
            this.slug = "";
        else
            this.slug = obj === null || obj === void 0 ? void 0 : obj.slug;
    }
}
exports.Category = Category;
const categorySchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: String,
    slug: String
});
exports.CategoryModel = mongoose_1.model('Category', categorySchema);
