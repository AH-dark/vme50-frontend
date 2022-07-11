import DonateInfo from "model/base/donateInfo";
import GormModel from "model/base/gormModel";

export default interface DonateInfoRequest
    extends Omit<DonateInfo, "url" | "payment" | keyof GormModel> {
    qrcode: File | null;
}
