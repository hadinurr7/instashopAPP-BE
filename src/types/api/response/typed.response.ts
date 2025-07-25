import { Response } from "express";

export type TypedResponse<T> = Response<T, Record<string, any>>;
