export class Form {
    public id: string;
    public password: string;
    public email: string;
    public fullname: string;
    public gender: number | null;
    public career: string;

    constructor();
    constructor(user: Form);
    constructor(obj?: any) {
        this.id = obj?.id || "";
        this.email = obj?.email || "";
        this.password = obj?.password || "";
        this.fullname = obj?.fullname || "";
        this.gender = obj?.gender || null;
        this.career = obj?.career || "";

    }
}
