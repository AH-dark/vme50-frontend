import GormModel from "./gormModel";

export default interface DonateInfo extends GormModel {
    name: string;
    payment: "wechat" | "alipay" | string;
    url: string;
    comment: string;
    author: number;
}
