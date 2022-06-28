export default interface ResponseData<T = any> {
    code: number;
    message: string;
    data?: T;
}
