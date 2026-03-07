import { Response } from "express";

interface CookieOptions {
  name: string;
  value: string;
  options?: any;
}

interface ResponseMeta {
  [key: string]: any;
}

interface ResponseData {
  [key: string]: any;
}

interface SendResponseOptions {
  message?: string;
  data?: ResponseData;
  cookies?: CookieOptions[];
  headers?: Record<string, string>;
  meta?: ResponseMeta;
}

const sendResponse = (
  res: Response,
  statusCode: number,
  {
    message = "Success",
    data = {},
    cookies = [],
    headers = {},
    meta,
  }: SendResponseOptions
) => {
  cookies.forEach(({ name, value, options }) => {
    res.cookie(name, value, options);
  });

  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  const responsePayload: any = {
    success: statusCode < 400,
    message,
    ...data,
  };

  if (meta) {
    responsePayload.meta = meta;
  }

  res.status(statusCode).json(responsePayload);
};

export default sendResponse;
