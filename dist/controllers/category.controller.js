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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY, BAD_REQUEST } = http_status_codes_1.default;
const functions_1 = require("@shared/functions");
const uuid_1 = require("uuid");
const category_service_1 = __importDefault(require("@services/category.service"));
const category_model_1 = require("@models/category.model");
const validate_service_1 = require("@services/validate.service");
const constants_1 = require("@shared/constants");
class CategoryController {
    constructor() {
        this.categoryService = new category_service_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cate = new category_model_1.Category(req.body);
            cate.id = uuid_1.v1();
            const cateValidate = new validate_service_1.ValidateService(cate);
            cateValidate.invalid(["name", "type", "slug"]);
            if (cateValidate.hasError()) {
                return res.status(BAD_REQUEST).send({ errors: cateValidate.errors });
            }
            if (cate.type != "product" && cate.type != "blog") {
                return res.status(BAD_REQUEST).send({ errors: { type: ["Type is not exists"] } });
            }
            if (yield this.categoryService.create(cate))
                return res.status(OK).send({ message: constants_1.messageResponse.CREATED_SUCCESS, data: cate });
            else
                return res.status(BAD_GATEWAY).send({ message: "Create failed" });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.categoryService.getList();
            return res.status(OK).send({ data: functions_1.mapObjectMongo(data, category_model_1.Category) });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = req.body.id;
            if (!id)
                return res.status(BAD_REQUEST).send({ errors: { id: ["Id invalid"] } });
            if (yield this.categoryService.delete(id)) {
                return res.status(OK).send({ message: "Delete successfully" });
            }
            else
                return res.status(BAD_GATEWAY).send({ message: "Delete failed" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const newCategory = new category_model_1.Category(req.body);
            const cateValidate = new validate_service_1.ValidateService(newCategory);
            cateValidate.invalid(['id', 'name', 'type', 'slug']);
            if (cateValidate.hasError())
                return res.status(BAD_REQUEST).send({ errors: cateValidate.errors });
            if (yield this.categoryService.update({ id }, newCategory)) {
                return res.status(OK).send({ message: constants_1.messageResponse.UPDATE_SUCCESS });
            }
            else
                res.status(BAD_REQUEST).send({ errors: constants_1.messageResponse.ERROR });
        });
    }
}
exports.default = CategoryController;
