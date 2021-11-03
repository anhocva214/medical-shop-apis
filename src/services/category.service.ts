import {Category, CategoryModel} from '@models/category.model';
import BasicDBService from './basic-db.service';

export default class CategoryService extends BasicDBService<Category>{
 
    constructor(){
        super()
        this.model = CategoryModel
    }

}