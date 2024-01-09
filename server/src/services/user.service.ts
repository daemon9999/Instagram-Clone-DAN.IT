import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class UserService {
  /* SIGN-IN */
  async signIn(email: string, password: string){
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return { statusCode: 409, data: { message: "User not found!" } };
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { statusCode: 401, data: { message: "Invalid Password!" } };
    }

    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "7d",
    });
    return { statusCode: 200, data: { token, id: user.id, message: "Login Succesful!" } };
  }

  /* SIGN-UP */
  async signUp(
    email: string,
    username: string,
    fullName: string,
    password: string
  ) {
    const existingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingEmail) {
      return {
        statusCode: 409,
        data: {
          message: "The account with this email is already available!",
        },
      };
    }
    const existingUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (existingUsername) {
      return {
        statusCode: 409,
        data: {
          message: "Username is already taken!",
        },
      };
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await prisma.user.create({
      data: {
        email,
        fullName,
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ _id: newUser.id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "7d",
    });
    return {
      statusCode: 201,
      data: {
        message: "New user is created!",
        token,
        id: newUser.id
      },
    };
  }

  async getUsersNotFollowedByUser(userId: string) {
    const usersNotFollowed = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
        
      },
      take: 4,
      select: {
        avatar: true,
        followerIds: true,
        username: true,
        id: true,
        fullName: true
      }
    }); 
   
    let newUsers = usersNotFollowed.map((u) => {
      if (!u.followerIds.includes(userId)) {
        return u
      };
    });
    newUsers = newUsers.filter(u => u)

    return newUsers;
  }
  async getProfile(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        posts: {
          select: {
            id: true,
            imageUrl: true
          },
          orderBy: {createdAt: 'desc'}
        },
        avatar: true,
        bio: true,
        followerIds: true,
        followingIds: true,
        fullName: true,
        id: true,
        username: true,
        email: true,
        createdAt: true
      }
      
    });
    
    return { statusCode: 200, data: { user } };
  }


  async updateProfile(id: string, username: string, fullName: string, bio: string | null, avatar: string | null) {
    await prisma.user.update({
      where: {
        id
      },
      data: {
        avatar,
        bio,
        username,
        fullName
      }
    })


    return {statusCode: 201, data: {message: "Profile Updated Successfully!"}}
  }

  async searchByUsername(username: string) {
    try {
      const users = await prisma.user.findMany({
        where: {
          username: {
            contains: username, // Adjust the condition as needed
          },
        },
        select: {
          avatar: true,
          username: true,
          id: true,
          fullName: true
        }
      });

      return {statusCode: 200, data: {users}};
    } catch (error) {
      throw error;
    }
  }
  
}
