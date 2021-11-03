import { Schema, model } from 'mongoose';



export class Category {
    public id: string;
    public name: string;
    public type: 'product' | 'blog';
    public slug: string;

    constructor();
    constructor(user: Category);
    constructor(obj?: any) {
        this.id = obj?.id || "";
        this.name = obj?.name || "";
        this.type = obj?.type || "";
        if (obj?.slug != "product" && obj?.slug == "blog") this.slug = "";
        else this.slug = obj?.slug
    }
}


const categorySchema = new Schema({
    id: { type: String, required: true },
    name: {type: String, required: true},
    type: String,
    slug: String
})

export const CategoryModel = model('Category', categorySchema);