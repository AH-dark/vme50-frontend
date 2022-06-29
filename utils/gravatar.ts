import { md5Encrypt } from "~/utils/hash";

export const getGravatar = (origin: string, email: string) => {
    return `https://${origin}${md5Encrypt(email)}`;
};
