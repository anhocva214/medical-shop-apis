import { Schema, model } from 'mongoose';



export class User {
    public id: string;
    public password: string;
    public email: string;
    public fullname: string;
    public gender: number;
    public career: string;
    public wishlist: string[]
    public access_token: string;

    constructor();
    constructor(user: User);
    constructor(obj?: any) {
        this.id = obj?.id || "";
        this.email = obj?.email || "";
        this.password = obj?.password || "";
        this.fullname = obj?.fullname || "";
        this.gender = obj?.gender || -1;
        this.career = obj?.career || "";
        this.wishlist = obj?.wishlist || [];
        this.access_token = obj?.access_token || "";

    }
}


const userSchema = new Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: String,
    gender: Number,
    career: String,
    wishlist: [String],
    access_token: String,
})

export const UserModel = model('User', userSchema);