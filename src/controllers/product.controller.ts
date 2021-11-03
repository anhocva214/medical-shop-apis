import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY, BAD_REQUEST } = StatusCodes;
import ProductService from '@services/product.service';
import { Product } from '@models/product.model';
import { HashMD5, mapObjectMongo } from '@shared/functions'
import { v1 as uuidv1 } from 'uuid'
import { ProductUpdateDTO } from '@models/request/produt-update';
import { messageResponse } from '@shared/constants';
import { ValidateService } from '@services/validate.service';



export default class ProductController {

    protected productService: ProductService;

    constructor() {
        this.productService = new ProductService()
    }

    async create(req: Request, res: Response) {
        let product = new Product(req.body);
        // console.log(product)
        product.id = uuidv1();
        product.createdAt = Date.now();

        const productValidate = new ValidateService(product)
        productValidate.invalid(["name", "description", "price", "categories", "timePublish"])

        if (productValidate.hasError())
            return res.status(BAD_REQUEST).send({message: messageResponse.ERROR, errors: productValidate.errors})

        // console.log(product)
        if (await this.productService.create(product)) {
            return res.status(OK).send({ message: messageResponse.CREATED_SUCCESS })

        }
        else
            return res.status(BAD_GATEWAY).send({ message: messageResponse.ERROR })

    }

    async getAll(req: Request, res: Response) {
        let products = await this.productService.getList();
        return res.status(OK).send({ data: mapObjectMongo(products, Product) })
    }

    async delete(req: Request, res: Response) {
        const id: string = req.body.id;
        if (!id) return res.status(BAD_REQUEST).send({message: 'Id is required'})

        if (await this.productService.delete(id))
            return res.status(OK).send({message: messageResponse.DELETE_SUCCESS})
        else 
            return res.send(BAD_GATEWAY).send({message: messageResponse.ERROR})
    }

    async updateInfo(req: Request, res: Response) {
        const id: string = req.body.id;
        let updateInfo = new ProductUpdateDTO(req.body)

        let product = await this.productService.findOne({id})
        if (!product) return res.status(BAD_REQUEST).send({message: 'Product is not found'})

        product = new Product({...product, ...updateInfo})
        // console.log(product)

        if (await this.productService.update({id: product.id}, product)){
            return res.status(OK).send({message: messageResponse.UPDATE_SUCCESS, data: product})
        }
        else 
            return res.status(BAD_GATEWAY).send({message: messageResponse.ERROR})

    }

}