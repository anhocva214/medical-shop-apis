import { Schema, model } from 'mongoose';



export class Product {
    public id: string;
    public name: string;
    public description: string;
    public price: {
        cost: number ,
        price: number ,
        unit: string
    };
    public categories: string[];
    public thumbnail: string[];
    public review: string[];
    public ratting: number;
    public createdAt: number ;
    public timePublish: number ;


    constructor();
    constructor(obj: Product);
    constructor(obj?: any) {
        this.id = obj?.id || "";
        this.name = obj?.name || "";
        this.description = obj?.description || "";
        this.price = obj?.price || {origin: null, saleOff: null, unit: null},
        this.categories = obj?.categories || [];
        this.thumbnail = obj?.thumbnail || [];
        this.review = obj?.reviewId || [];
        this.ratting = obj?.ratting || [];
        this.createdAt = obj?.createdAt || null;
        this.timePublish = obj?.timePublish || null;

    }
}


const productSchema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true},
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
})

export const ProductModel = model('Product', productSchema);