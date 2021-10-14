import { Schema, model } from 'mongoose';



export class Admin {
    public id: string;
    public username: string;
    public password: string;
    public email: string;
    public access_token: string;

    constructor();
    constructor(user: Admin);
    constructor(obj?: any) {
        this.id = obj?.id || "";
        this.username = obj?.username || "";
        this.password = obj?.password || "";
        this.email = obj?.email || "";
        this.access_token = obj?.access_token || "";

    }
}


const adminSchema = new Schema({
    id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: String,
    access_token: String,
})

export const AdminModel = model('Admin', adminSchema);