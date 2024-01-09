import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export class FollowService {
  async followUser(followerId: string, followingId: string) {
    await prisma.user.update({
      where: {
        id: followerId,
      },
      data: { followingIds: { push: followingId } },
    });

    await prisma.user.update({
      where: {
        id: followingId,
      },
      data: { followerIds: { push: followerId } },
    });

    return { statusCode: 200, data: { message: "User Followed!" } };
  }

  async unfollowUser(followerId: string, followingId: string) {
    const data = await prisma.user.findUnique({
      where: {
        id: followerId,
      },
      select: { followingIds: true },
    });
    const newFollowingIds = data?.followingIds.filter(
      (value) => value !== followingId
    );
    await prisma.user.update({
      where: {
        id: followerId,
      },
      data: { followingIds: { set: newFollowingIds } },
    });

    const data_2 = await prisma.user.findUnique({
      where: {
        id: followingId,
      },
      select: { followerIds: true },
    });
    const newFollowerIds = data_2?.followerIds.filter(
      (value) => value !== followerId
    );

    await prisma.user.update({
      where: {
        id: followingId,
      },
      data: { followerIds: { set: newFollowerIds } },
    });

    return { statusCode: 200, data: { message: "User Unfollowed!" } };
  }
}
