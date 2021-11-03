import StatusCodes, {  } from 'http-status-codes';
import { Request, Response } from 'express';
const { UNAUTHORIZED, CREATED, OK, BAD_GATEWAY , BAD_REQUEST} = StatusCodes;
import {Admin} from '@models/admin.model';
import {HashMD5} from '@shared/functions'
import {v1 as uuidv1} from 'uuid'
import {JwtService} from '@services/jwt.service'
import AdminService from '@services/admin.service'

export default class AdminController {
    
    private admin : Admin;
    private adminService : AdminService;
    private jwtService : JwtService;

    constructor(){
        this.admin = new Admin();
        this.adminService = new AdminService();
        this.jwtService = new JwtService();
    }

    // create new admin
    async create(req: Request, res: Response){
        let admin = new Admin(req.body);
        // console.log(admin)
        if (!admin.username || !admin.password || !req.body.code)
            return res.status(BAD_REQUEST).send({message: "Info invalid"})
        if (req.body.code != "122112")
            return res.status(UNAUTHORIZED).send({message: "Code is wrong"})

        if (await this.adminService.isExists({username: admin.username}))
            return res.status(BAD_REQUEST).send({message: "Username is exists"})

        admin.id = uuidv1();
        admin.password = HashMD5(admin.password)
        this.adminService.create(admin)

        return res.status(OK).send({message: "Create admin successfully"})
    }

    // login
    async login(req: Request, res: Response){
        let admin = new Admin(req.body)

        if (!await this.adminService.isExists({username: admin.username, password: HashMD5(admin.password)})) 
            return res.status(UNAUTHORIZED).send({message: "Login fail"})

        admin = await this.adminService.findOne({username: admin.username});
        admin.access_token = await this.jwtService.generateJwt(admin);
        this.adminService.update(admin);
        return res.status(OK).send({message: "Login successfully", data: admin, token: {
            access_token: admin.access_token,
            expiresIn: 7*60*60*24
        }})
    }

    // authenticate
    async authenticate(req: Request, res: Response){
        this.admin = new Admin(req.user);
        return res.status(OK).send({ data: this.admin, token: {
            access_token: this.admin.access_token,
            expiresIn: 7*60*60*24
        }})
    }
}