export default interface DonateInfoRequest {
    name: string;
    email: string;
    payment: "wechat" | "alipay" | string;
    qrcode: File | null;
}
