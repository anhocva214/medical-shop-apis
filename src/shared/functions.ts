import logger from './Logger';
import CryptoJS from 'crypto-js'


export const HashMD5 = (data: any): string => {
    let hash = CryptoJS.MD5(data)
    return hash.toString()
}

export const pErr = (err: Error) => {
    if (err) {
        logger.err(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const getFromEpoch = (epoch: number) => {
    let d = new Date(epoch);

    let getDDMMYYYY = d.getDate() + "/" + (d.getMonth() + 1).toString() + "/" + d.getFullYear();

    return {
        getDDMMYYYY: () => getDDMMYYYY,
        date: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear()
    }
}

export const convertToSlug = (str: string) => {
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
}

export const mapObjectMongo = (data: any[], object: any) => {
    return data.map( (item: any) => new object(item._doc))
}
