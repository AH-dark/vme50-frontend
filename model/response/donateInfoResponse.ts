import GormModelData from "~/model/response/gormModelData";

export default interface DonateInfoResponse extends GormModelData {
    name: string;
    email: string;
    payment: "wechat" | "alipay" | string;
    url: string;
}
