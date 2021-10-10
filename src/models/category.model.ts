import { Schema, model } from 'mongoose';



export class Category {
    public id: string;
    public name: string;
    public type: 'product' | 'blog' | null;

    constructor();
    constructor(user: Category);
    constructor(obj?: any) {
        this.id = obj?.id || "";
        this.name = obj?.name || "";
        this.type = obj?.type || null
    }
}


const categorySchema = new Schema({
    id: { type: String, required: true },

})

export const CategoryModel = model('Category', categorySchema);