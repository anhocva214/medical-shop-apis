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
const product_service_1 = __importDefault(require("@services/product.service"));
const product_model_1 = require("@models/product.model");
const functions_1 = require("@shared/functions");
const uuid_1 = require("uuid");
const produt_update_1 = require("@models/request/produt-update");
const constants_1 = require("@shared/constants");
const validate_service_1 = require("@services/validate.service");
class ProductController {
    constructor() {
        this.productService = new product_service_1.default();
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = new product_model_1.Product(req.body);
            // console.log(product)
            product.id = uuid_1.v1();
            product.createdAt = Date.now();
            const productValidate = new validate_service_1.ValidateService(product);
            productValidate.invalid(["name", "description", "price", "categories", "timePublish"]);
            if (productValidate.hasError())
                return res.status(BAD_REQUEST).send({ message: constants_1.messageResponse.ERROR, errors: productValidate.errors });
            // console.log(product)
            if (yield this.productService.create(product)) {
                return res.status(OK).send({ message: constants_1.messageResponse.CREATED_SUCCESS });
            }
            else
                return res.status(BAD_GATEWAY).send({ message: constants_1.messageResponse.ERROR });
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let products = yield this.productService.getList();
            return res.status(OK).send({ data: functions_1.mapObjectMongo(products, product_model_1.Product) });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            if (!id)
                return res.status(BAD_REQUEST).send({ message: 'Id is required' });
            if (yield this.productService.delete(id))
                return res.status(OK).send({ message: constants_1.messageResponse.DELETE_SUCCESS });
            else
                return res.send(BAD_GATEWAY).send({ message: constants_1.messageResponse.ERROR });
        });
    }
    updateInfo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            let updateInfo = new produt_update_1.ProductUpdateDTO(req.body);
            let product = yield this.productService.findOne({ id });
            if (!product)
                return res.status(BAD_REQUEST).send({ message: 'Product is not found' });
            product = new product_model_1.Product(Object.assign(Object.assign({}, product), updateInfo));
            // console.log(product)
            if (yield this.productService.update({ id: product.id }, product)) {
                return res.status(OK).send({ message: constants_1.messageResponse.UPDATE_SUCCESS, data: product });
            }
            else
                return res.status(BAD_GATEWAY).send({ message: constants_1.messageResponse.ERROR });
        });
    }
}
exports.default = ProductController;
