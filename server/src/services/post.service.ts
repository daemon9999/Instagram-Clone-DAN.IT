import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();
export class PostService {
  async createPost(
    userId: string,
    caption: string,
    imageUrl: string,
    location: string
  ) {
    await prisma.post.create({
      data: {
        imageUrl,
        caption,
        location,
        userId,
      },
    });

    return {
      statusCode: 201,
      data: {
        message: "Post Created Successfully!",
      },
    };
  }

  async deletePost(userId: string, postId: string) {
    await prisma.post.delete({
      where: {
        userId,
        id: postId,
      },
    });

    return {
      statusCode: 201,
      data: {
        message: "Post Deleted Successfully!",
      },
    };
  }

  async getPostById(postId: string) {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        id: true,
        caption: true,
        comments: {
          select: {
            content: true,
            user: {
              select: {
                avatar: true,
                username: true,
              },
            },
            id: true,
            createdAt: true,
          },
        },
        createdAt: true,
        imageUrl: true,
        location: true,
        user: {
          select: {
            username: true,
            avatar: true,
            id: true,
            followerIds: true,
          },
        },
        favorites: {
          select: {
            userId: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });

    return { statusCode: 200, data: { post } };
  }

  async getFollowedUserPosts(userId: string) {
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        followingIds: true,
      },
    });

    const followingIds = userData?.followingIds;

    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        userId: {
          in: followingIds,
        },
      },
      select: {
        user: {
          select: {
            avatar: true,
            username: true,
            followerIds: true,
          },
        },
        likes: {
          select: {
            userId: true,
            postId: true,
          },
        },
        createdAt: true,
        caption: true,
        imageUrl: true,
        location: true,
        userId: true,
        id: true,
        comments: {
          select: {
            user: {
              select: { username: true },
            },
            content: true,
            userId: true,
          },
        },
        favorites: {
          select: {
            postId: true,
            userId: true,
          },
        },
      },
    });

    return { statusCode: 200, data: { posts } };
  }
}
