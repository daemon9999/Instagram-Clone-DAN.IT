import { Request, Response } from "express";
import { UserService } from "../services/user.service";

import { JwtPayload, verify } from "jsonwebtoken";
import { findId } from "../utils/findId";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  /* SIGN-IN */
  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { statusCode, data } = await this.userService.signIn(
        email,
        password
      );
      if (res.statusCode !== 200) {
        return res.status(statusCode).json(data);
      }

      res.cookie("jwt", data.token);
      res.cookie("userId", data.id);
      return res.status(statusCode).json(data);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error!" + err });
    }
  }

  /* SIGN-UP */
  async signUp(req: Request, res: Response) {
    try {
      const { email, fullName, username, password } = req.body;
      const { statusCode, data } = await this.userService.signUp(
        email,
        username,
        fullName,
        password
      );
      if (statusCode !== 201) {
        return res.status(statusCode).json(data);
      }
      res.cookie("jwt", data.token);
      res.cookie("userId", data.id);
      return res.status(statusCode).json(data);
    } catch {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  /* SIGN-OUT */
  async signOut(_req: Request, res: Response) {
    res.clearCookie("jwt", { httpOnly: true });
    res.clearCookie("userId", { httpOnly: true });
    res.status(200).json({ message: "Logout Successfull!" });
  }

  /* GET PROFILE */
  async getProfile(req: Request, res: Response) {
    try {
      let _id: string;
      if (req.query.id) {
        _id = req.query.id as string;
      } else {
        _id = findId(req);
      }
      const {
        statusCode,
        data: { user },
      } = await this.userService.getProfile(_id);
      return res.status(statusCode).json(user);
    } catch {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  /* GET NOT FOLLOWED USERS */
  async getUsersNotFollowedByUser(req: Request, res: Response) {
    try {
      const _id = findId(req);
      const users = await this.userService.getUsersNotFollowedByUser(_id);
      return res.status(200).json(users);
    } catch {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async getUserId(req: Request, res: Response) {
    try {
      const _id = findId(req);
      return res.status(200).json({ id: _id });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const _id = findId(req)
      const {username, fullName, avatar, bio} = req.body
      const {statusCode, data} = await this.userService.updateProfile(_id, username as string, fullName as string, bio as string, avatar as string)
      
      return res.status(statusCode).json({message: data.message})
    } catch (error) {
      res.status(500).json({message: "Internal Server Error!"})
    }
  }

  async searchByUsername(req: Request, res: Response) {
    try {
     
      const {username} = req.query 
      if (username!.toString().trim()  === '' ) {
        return res.status(200).json([])
      }
      const {statusCode, data} = await this.userService.searchByUsername(username as string)
      return res.status(statusCode).json(data.users)
    } catch (error) {
      res.status(500).json({message: "Internal Server Error!"})
    }
  }
}
