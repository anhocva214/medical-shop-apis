"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.Product = void 0;
const mongoose_1 = require("mongoose");
class Product {
    constructor(obj) {
        this.id = (obj === null || obj === void 0 ? void 0 : obj.id) || "";
        this.name = (obj === null || obj === void 0 ? void 0 : obj.name) || "";
        this.description = (obj === null || obj === void 0 ? void 0 : obj.description) || "";
        this.price = (obj === null || obj === void 0 ? void 0 : obj.price) || { origin: null, saleOff: null, unit: null },
            this.categories = (obj === null || obj === void 0 ? void 0 : obj.categories) || [];
        this.thumbnail = (obj === null || obj === void 0 ? void 0 : obj.thumbnail) || [];
        this.review = (obj === null || obj === void 0 ? void 0 : obj.reviewId) || [];
        this.ratting = (obj === null || obj === void 0 ? void 0 : obj.ratting) || [];
        this.createdAt = (obj === null || obj === void 0 ? void 0 : obj.createdAt) || null;
        this.timePublish = (obj === null || obj === void 0 ? void 0 : obj.timePublish) || null;
    }
}
exports.Product = Product;
const productSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    price: {
        cost: Number,
        price: Number,
        unit: String
    },
    categories: [String],
    thumbnail: [String],
    review: [String],
    ratting: Number,
    createdAt: Number
});
exports.ProductModel = mongoose_1.model('Product', productSchema);
