import DonateInfo from "../base/donateInfo";
import GormModel from "../base/gormModel";

export default interface DonateInfoRequest extends Omit<DonateInfo, "url" | keyof GormModel> {
    qrcode: File | null;
}
