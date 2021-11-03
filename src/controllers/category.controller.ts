import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY , BAD_REQUEST} = StatusCodes;
import {HashMD5, mapObjectMongo} from '@shared/functions'
import {v1 as uuidv1} from 'uuid'
import CategoryService from '@services/category.service';
import { Category } from '@models/category.model';
import { ValidateService } from '@services/validate.service';
import { messageResponse } from '@shared/constants';


export default class CategoryController {

    private categoryService: CategoryService;

    constructor(){
        this.categoryService = new CategoryService();
    }

    async create(req: Request, res: Response) {
        let cate = new Category(req.body);
        cate.id = uuidv1()

        
        const cateValidate = new ValidateService(cate)
        cateValidate.invalid(["name", "type", "slug"])

        if (cateValidate.hasError()){
            return res.status(BAD_REQUEST).send({errors: cateValidate.errors})
        }

        if (cate.type != "product" && cate.type != "blog"){
            return res.status(BAD_REQUEST).send({errors: {type: ["Type is not exists"]}})
        }


        if (await this.categoryService.create(cate))
            return res.status(OK).send({message: messageResponse.CREATED_SUCCESS, data: cate})
        else 
            return res.status(BAD_GATEWAY).send({message: "Create failed"})
    }

    async getAll(req: Request, res: Response){
        let data = await this.categoryService.getList()
        return res.status(OK).send({data: mapObjectMongo(data, Category)})
    }

    async delete(req: Request, res: Response){
        let id = req.body.id;
        if (!id) return res.status(BAD_REQUEST).send({errors: {id: ["Id invalid"]}})

        if (await this.categoryService.delete(id)){
            return res.status(OK).send({message: "Delete successfully"})
        }
        else 
            return res.status(BAD_GATEWAY).send({message: "Delete failed"})
    }

    async update(req: Request, res: Response) {
        const id = req.body.id;
        const newCategory = new Category(req.body);
        const cateValidate = new ValidateService(newCategory)
        cateValidate.invalid(['id', 'name', 'type', 'slug'])

        if (cateValidate.hasError()) return res.status(BAD_REQUEST).send({errors: cateValidate.errors})

        if (await this.categoryService.update({id}, newCategory) ){
            return res.status(OK).send({message: messageResponse.UPDATE_SUCCESS})
        }
        else res.status(BAD_REQUEST).send({errors: messageResponse.ERROR})
    

    }



}