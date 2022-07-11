import GormModel from "./gormModel";

export default interface DonateInfo extends GormModel {
    name: string;
    email: string;
    payment: "wechat" | "alipay" | string;
    url: string;
}
