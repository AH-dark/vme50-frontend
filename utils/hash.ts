import CryptoJS from "crypto-js";

export const md5Encrypt = (str: string) => CryptoJS.MD5(str).toString();
