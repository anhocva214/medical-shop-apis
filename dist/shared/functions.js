"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapObjectMongo = exports.convertToSlug = exports.getFromEpoch = exports.getRandomInt = exports.pErr = exports.HashMD5 = void 0;
const Logger_1 = __importDefault(require("./Logger"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const HashMD5 = (data) => {
    let hash = crypto_js_1.default.MD5(data);
    return hash.toString();
};
exports.HashMD5 = HashMD5;
const pErr = (err) => {
    if (err) {
        Logger_1.default.err(err);
    }
};
exports.pErr = pErr;
const getRandomInt = () => {
    return Math.floor(Math.random() * 1000000000000);
};
exports.getRandomInt = getRandomInt;
const getFromEpoch = (epoch) => {
    let d = new Date(epoch);
    let getDDMMYYYY = d.getDate() + "/" + (d.getMonth() + 1).toString() + "/" + d.getFullYear();
    return {
        getDDMMYYYY: () => getDDMMYYYY,
        date: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear()
    };
};
exports.getFromEpoch = getFromEpoch;
const convertToSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, "");
    str = str.toLowerCase();
    var from = "àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ·/_,:;";
    var to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd------";
    for (var i = 0; i < from.length; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    return str;
};
exports.convertToSlug = convertToSlug;
const mapObjectMongo = (data, object) => {
    return data.map((item) => new object(item._doc));
};
exports.mapObjectMongo = mapObjectMongo;
