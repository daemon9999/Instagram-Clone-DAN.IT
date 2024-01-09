import { NextFunction, Request, RequestHandler, Response } from "express";
import { check, validationResult } from "express-validator";
import * as jwt from "jsonwebtoken"

export const validateSignUp = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least eight characters long"),
  check("username")
    .custom((value) => !/\s/.test(value))
    .withMessage("Username cannot contain spaces"),
  check("fullName")
    .isLength({ min: 6 })
    .withMessage("Full name must be at least six characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const messages = errors.array().map((obj: any) => obj.msg);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: messages.join(".\n") });
    }

    next();
  },
];

export const validateSignIn = [
  check("email").isEmail().withMessage("Invalid email format"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least eight characters long"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const messages = errors.array().map((obj: any) => obj.msg);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: messages.join(".\n") });
    }
    next();
  },
];

export const validateUpdateProfile = [


  check("username")
    .custom((value) => !/\s/.test(value))
    .withMessage("Username cannot contain spaces"),
  check("fullName")
    .isLength({ min: 6 })
    .withMessage("Full name must be at least six characters long"),
  check("bio")
    .isLength({max: 200})
    .withMessage("Bio must be maximum at 200 characters long"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const messages = errors.array().map((obj: any) => obj.msg);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: messages.join(".\n") });
    }

    next();
  },
];

export const authenticateToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Missing Token' });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, user) => {
      
      if (err) {
        return res.status(403).json({error: 'Forbidden - Invalid Token' })
      }

      
      next();
  });
};