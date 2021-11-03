export class ProductUpdateDTO{
    name: string;
    description: string;
    price: {
        cost: number,
        price: number,
        unit: string;
    };
    categories: string[];
    timePublish: number;

    constructor();
    constructor(obj?: ProductUpdateDTO);
    constructor(obj?: any){
        this.name = obj?.name || "";
        this.description = obj?.description || "";
        this.price = obj?.price || "";
        this.categories = obj?.categories || "";
        this.timePublish = obj?.timePublish || null;
    }
}