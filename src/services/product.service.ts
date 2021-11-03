import {Product, ProductModel} from '@models/product.model';
import BasicDBService from './basic-db.service';

export default class ProductService extends BasicDBService<Product>{
 
    constructor(){
        super()
        this.model = ProductModel
    }

}