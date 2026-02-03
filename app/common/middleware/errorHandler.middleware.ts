import {type ResponseError } from "../helper/response.helper";
import { type ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next)=>{
    const error:ResponseError = {
        success: false,
        message: (err?.message || "Something went wrong") as string,
        error_code: (err?.status || 500) as number,
        data: err?.data || {}
    }
    res.status(error.error_code).json(error);
    next();
}