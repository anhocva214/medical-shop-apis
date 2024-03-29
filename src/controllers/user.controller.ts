import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
const { FORBIDDEN, CREATED, OK, BAD_GATEWAY , BAD_REQUEST} = StatusCodes;
import {User} from '@models/user.model';
import {HashMD5} from '@shared/functions'
import {v1 as uuidv1} from 'uuid'
import {JwtService} from '@services/jwt.service'
import UserService from '@services/user.service'
import { ValidateService } from '@services/validate.service';


export default class UserController {
    private user: User;
    private userServive: UserService;
    private jwtService: JwtService;
    
    constructor(){
        this.user = new User();
        this.userServive = new UserService();
        this.jwtService = new JwtService();
    }

    // Regiser new user
    async register(req: Request, res: Response){
        let user = new User(req.body)

        let userValidate= new ValidateService(user)
        let errorsRegister = userValidate.formRegister()
        // console.log(Object.keys(errorsRegister))
        if (Object.keys(errorsRegister).length > 0)
            return res.status(BAD_REQUEST).send({message: "Regsiter failed", errors: errorsRegister})

        if (await this.userServive.isExists({email: user.email})){
            return res.status(BAD_REQUEST).send({message: "Register failed", errors: [{email: 'Email is exists'}]})
        }

        user.id = uuidv1()
        user.password = HashMD5(user.password)
        // console.log(user)

        await this.userServive.create(user)

        
        return res.status(OK).send({message: "Register successfully"})
    }

    // Login
    async login(req: Request, res: Response){
        let form = req.body;
        if (!form.username || !form.password)
            return res.status(BAD_REQUEST).send({message: "Username/Password invalid"})

        let user : User = await this.userServive.findOne({username: form.username});
        if (!user)
            return res.status(BAD_REQUEST).send({message: "Username/Password invalid"})
        
        if (user.password != HashMD5(form.password))
            return res.status(BAD_REQUEST).send({message: "Username/Password invalid"})

        user.access_token = await this.jwtService.generateJwt(user);
        
        await this.userServive.update(user)
        
        return res.status(OK).send({message: "Login successfully", data: user})
    }

    // logout
    async logout(req: Request, res: Response){
        let user : User = req.user;
        user.access_token = "";
        await this.userServive.update(user);

        return res.status(OK).send({message: "Logout successfully"})
    }

    // check access token
    async authenticate(req: Request, res: Response){
        return res.status(OK).send({data: req.user})
    }

    // update info
    async update(req: Request, res: Response){
        this.user = new User(req.body);
        this.user.id = req.user.id;
        
        if (!this.user.email)
            return res.status(BAD_REQUEST).send({message: "Email invalid", error_form: "Email không được để trống"})
        
        let user_query = await this.userServive.findOne({email: this.user.email})
        if (user_query.email != req.user.email)
            return res.status(BAD_REQUEST).send({message: "Email is exists", error_form: "Email đã tồn tại"})

        if (!!req.body.new_password){
            this.user.password = HashMD5(req.body.new_password)
        }
        else this.user.password = req.user.password;

        await this.userServive.update(this.user)

        return res.status(OK).send({message: "Update successfully", data: this.user})
    }


}

