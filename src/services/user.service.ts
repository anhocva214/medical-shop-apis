import {User, UserModel} from '@models/user.model';


export default class UserService{

    private userModel: typeof UserModel;

    constructor(){
        this.userModel = UserModel;
    }

    async create(user: User): Promise<void>{
        try{
            await this.userModel.create(user)
        }
        catch(e){
            console.log("UserService -> create: ", e)
        }
    }

    async getAll(): Promise<User[]>{
        let users : User[] = await this.userModel.find();
        return users
    }

    async delete(id: string): Promise<void>{
        try{
            await this.userModel.deleteOne({id})
        }
        catch(e){
            console.log("UserService -> delete: ", e)
        }
    }

    async update(user: User): Promise<void>{
        try{
            await this.userModel.updateOne({id: user.id}, user)
        }
        catch(e){
            console.log("UserService -> update: ", e)
        }
    }

    
    async isExists(objQuery: object): Promise<boolean>{
        let query : User[] = await this.userModel.findOne(objQuery);
        if (!!query) return true
        else return false
    }

    async findOne(objQuery: object): Promise<User>{
        let user: User = await this.userModel.findOne(objQuery);
        return user
    }

}