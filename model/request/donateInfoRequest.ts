export default interface DonateInfoRequest {
    name: string;
    message: string;
    payment: "微信" | "支付宝" | string;
    qrcode: File | null;
}
