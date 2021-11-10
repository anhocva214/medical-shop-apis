"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashMD5 = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { UNAUTHORIZED } = http_status_codes_1.default;
const crypto_js_1 = __importDefault(require("crypto-js"));
const HashMD5 = (data) => {
    return crypto_js_1.default.MD5(data);
};
exports.HashMD5 = HashMD5;
// export const AuthAPIs = async (req: Request, res: Response, next: NextFunction)=>{
//     // console.log(req.headers)
//     let token : any = req.headers.token;
//     let dataToken : any = DecodeToken(token);
//     if (!!dataToken){
//         let username : string = dataToken.data.username;
//         let account : any = await GetOne(username);
//         if (!account){
//             return res.status(UNAUTHORIZED).send({message: "Invalid token"})
//         }
//         else if (account.token != token){
//             return res.status(UNAUTHORIZED).send({message: "Invalid token"})
//         }
//         else{
//             next();
//         }
//     }
//     else{
//         return res.status(UNAUTHORIZED).send({message: "Invalid token"})
//     }
// }
