import { User, UserModel } from '@models/user.model';


export default class BasicDBService<O>{

    protected model: typeof UserModel;

    constructor() {
        this.model = UserModel;
    }

    async create(object: O): Promise<boolean> {
        try {
            await this.model.create(object)
            return true
        }
        catch (err) {
            console.log("create err: ", err)
            return false
        }
    }

    async getList(): Promise<O[]> {
        let objects: O[] = await this.model.find();
        return objects
    }

    async delete(id: string): Promise<boolean> {
        try {
            await this.model.deleteOne({ id })
            return true
        }
        catch (err) {
            return false
        }
    }

    async update(filterObj: object, dataUpdate: O): Promise<boolean> {
        try{
            await this.model.updateOne(filterObj, dataUpdate)
            return true;
        }
        catch(err){
            return false
        }
    }

    async isExists(objQuery: object): Promise<boolean> {
        let query: O[] = await this.model.findOne(objQuery);
        if (!!query) return true
        else return false
    }

    async findOne(objQuery: object): Promise<O> {
        let obj: any = await this.model.findOne(objQuery);
        
        return obj._doc
    }

}