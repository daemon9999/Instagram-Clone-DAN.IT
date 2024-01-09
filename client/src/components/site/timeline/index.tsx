import { useCallback, useMemo  } from "react";
import PostItem from "../post-item";
import { useSelector } from "react-redux";
import { selectUserId } from "src/store/auth-slice";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "src/store/api/like-api-slice";
import toast from "react-hot-toast";
import {
  useFavoritePostMutation,
  useUnfavoritePostMutation,
} from "src/store/api/favorite-api-slice";

interface TimelineProps {
  posts: PostItem[];
}
export default function Timeline({ posts }: TimelineProps) {
  const userId = useSelector(selectUserId);
  const [like, { isLoading: likeLoading, status }] = useLikePostMutation();
  const [unlike, { isLoading: unlikeLoading }] = useUnlikePostMutation();
  const [favorite] = useFavoritePostMutation();
  const [unfavorite] = useUnfavoritePostMutation();
 
  const postsWithLikedStatus = useMemo(() => {
    return posts.map((post: PostItem) => {
      return {
        ...post,
        isLiked: post.likes.some((like) => like.userId === userId),
        isFavorite: post.favorites.some(
          (favorite) => favorite.userId === userId
        ),
      };
    });
  }, [posts]);

  const handleFavorite = useCallback(
    async (postId: string) => {
      try {
        await favorite({ postId }).unwrap();
      } catch (err) {
        toast.error("Unsuccessfull!");
      }
    },
    [favorite]
  );

  const handleUnfavorite = useCallback(
    async (postId: string) => {
      try {
        await unfavorite({ postId }).unwrap();
      } catch (err) {
        toast.error("Unsuccessfull!");
      }
    },
    [unfavorite]
  );
  const handleLike = useCallback(
    async (postId: string) => {
      try {
        await like({ postId }).unwrap();
      } catch (err) {
        toast.error("Unsuccessfull!");
      } finally {
      }
    },
    [like]
  );

  const handleUnlike = useCallback(
    async (postId: string) => {
      try {
        await unlike({ postId }).unwrap();
      } catch (err) {
        toast.error("Unsuccessfull!");
      }
    },
    [unlike]
  );




  return (
    <div className="flex flex-col  gap-y-10 items-center bg-white py-10 border-x border-t">
      {postsWithLikedStatus.length > 0 &&
        postsWithLikedStatus.map((post: PostItem) => (
          <PostItem
            handleFavorite={handleFavorite}
            handleUnfavorite={handleUnfavorite}
            post={post}
            key={post.id}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            likeLoading={likeLoading}
            unlikeLoading={unlikeLoading}
            status={status}
          />
        ))}
    </div>
  );
}
