
interface ResponseData{
    success:boolean;
    message?:string;
    data:object| null | any;
}

export interface ResponseError extends ResponseData{
    error_code: number;
}

export const createResponse = (
  data: ResponseData["data"],
  message?: string
): ResponseData => {
  return { data, message, success: true };
};