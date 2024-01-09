import { Request } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
export const findId = (req: Request) : string => {
  const token = req.headers.authorization?.split(" ")[1];
  const { _id } = verify(token!, process.env.JWT_SECRET_KEY!) as JwtPayload;

  return _id;
};
