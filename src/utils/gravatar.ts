import { md5Encrypt } from "./hash";

export const getGravatar = (origin: string, email: string) => {
    return `https://${origin}${md5Encrypt(email)}`;
};
