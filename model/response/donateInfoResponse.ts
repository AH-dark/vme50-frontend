import GormModelData from "~/model/response/gormModelData";

export default interface DonateInfoResponse extends GormModelData {
    name: string;
    email: string;
    payment: "微信" | "支付宝" | string;
    url: string;
    message: string;
}
