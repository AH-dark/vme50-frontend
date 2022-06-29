export default interface DonateInfoResponse {
    name: string;
    email: string;
    payment: "wechat" | "alipay" | string;
    url: string;
}
