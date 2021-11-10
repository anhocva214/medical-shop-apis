"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = require("@models/category.model");
const basic_db_service_1 = __importDefault(require("./basic-db.service"));
class CategoryService extends basic_db_service_1.default {
    constructor() {
        super();
        this.model = category_model_1.CategoryModel;
    }
}
exports.default = CategoryService;
