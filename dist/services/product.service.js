"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("@models/product.model");
const basic_db_service_1 = __importDefault(require("./basic-db.service"));
class ProductService extends basic_db_service_1.default {
    constructor() {
        super();
        this.model = product_model_1.ProductModel;
    }
}
exports.default = ProductService;
