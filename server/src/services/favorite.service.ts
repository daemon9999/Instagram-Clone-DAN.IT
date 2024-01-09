import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class FavoriteService {
  async favoritePost(userId: string, postId: string) {
    await prisma.postFavorite.create({
      data: {
        userId,
        postId,
      },
    });

    return { statusCode: 201 };
  }

  async unfavoritePost(userId: string, postId: string) {
    await prisma.postFavorite.deleteMany({
      where: {
        userId,
        postId,
      },
    });

    return { statusCode: 201 };
  }

  async getFavoritePosts(userId: string) {
    const posts = await prisma.postFavorite.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        post: {
          select: {
            caption: true,
            createdAt: true,
            id: true,
            likes: {
              select: {
                userId: true,
                postId: true,
              },
            },
            favorites: {
              select: {
                userId: true,
              },
            },
            location: true,
            imageUrl: true,
            user: {
              select: {
                avatar: true,
                username: true,
                id: true,
              },
            },

            comments: {
              select: {
                user: {
                  select: {
                    username: true,
                    id: true,
                  },
                },
                content: true,
              },
            },
          },
        },
      },
    });
    const favoritePosts = posts.map((post) => post.post);
    return { statusCode: 200, data: { favoritePosts } };
  }
}
