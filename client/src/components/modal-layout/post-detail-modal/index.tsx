import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaBookmark, FaRegBookmark, FaRegComment } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, To, useNavigate } from "react-router-dom";
import PostLoader from "src/components/loaders/post-loader";
import Image from "src/components/profile/image";
import {
  useAddCommentMutation,
  useGetPostCommentsQuery,
} from "src/store/api/comment-api-slice";
import {
  useFavoritePostMutation,
  useUnfavoritePostMutation,
} from "src/store/api/favorite-api-slice";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "src/store/api/like-api-slice";
import { useGetPostByIdQuery } from "src/store/api/post-api-slice";
import { selectUserId } from "src/store/auth-slice";
import { calculateTime } from "src/utils/calculateTime";
import { handleAppendModal, handleDeleteModal } from "src/utils/modal";

interface PostDetailModal {
  data: string;
}
export default function PostDetailModal({ data: postId }: PostDetailModal) {
  const { data: post, isLoading } = useGetPostByIdQuery({ id: postId });
  const { data: comments } = useGetPostCommentsQuery({ postId });
  const [like, { isLoading: likeLoading }] = useLikePostMutation();
  const [unlike, { isLoading: unlikeLoading }] = useUnlikePostMutation();
  const [favorite, { isLoading: favoriteLoading }] = useFavoritePostMutation();
  const [unfavorite, { isLoading: unfavoriteLoading }] =
    useUnfavoritePostMutation();
  const [addComment] = useAddCommentMutation();
  const [commentValue, setCommentValue] = useState<string>("");
  const userId = useSelector(selectUserId);
  const [ownPost, setOwnPost] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(false);
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
        setTimeout(() => {}, 500);
      } catch (err) {
        toast.error("Unsuccessfull!");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const content = commentValue;
      setCommentValue("");
      const { message } = await addComment({
        postId: post.id,
        content,
      }).unwrap();
      toast.success(message);
    } catch {
      toast.error("Comment can not be added!");
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setOwnPost(post.user.id === userId);
    }
  }, [isLoading]);

  const isFavorite = post?.favorites.some(
    (fav: PostFavoriteItem) => fav.userId === userId
  );
  const isLiked = post?.likes.some(
    (like: PostLikeItem) => like.userId === userId
  );
  const inputRef = useRef<HTMLInputElement | null>(null);
  const userProfileUrl = (id: string) => {
    if (id === userId) {
      return false;
    }
    return `/${id}`;
  };
  const navigate = useNavigate();
  const handleLink = (id: string) => {
    if (userProfileUrl(id)) {
      handleDeleteModal();
      navigate(userProfileUrl(id) as To);
    }
  };
  return (
    <div className="bg-white w-5/6 h-[90%] rounded-lg overflow-hidden shadow-lg flex mx-auto">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <PostLoader />
        </div>
      ) : (
        <>
          <div className="bg-black w-2/3 flex items-center justify-center">
            <img
              src={post.imageUrl}
              alt="Post"
              className="w-full h-auto bg-center bg-cover"
            />
          </div>

          <div className="w-1/3 flex-shrink-0 flex flex-col  border-l">
            <div className="border-b-gray-100 p-4  border-b-2">
              <div className="flex items-center space-x-2 justify-between  ">
                <div className="flex items-center gap-x-2">
                  <button
                    disabled={!userProfileUrl(post.user.id)}
                    onClick={() => handleLink(post.user.id)}
                  >
                    <Image url={post.avatar} size={12} />
                  </button>
                  <div className="flex flex-col">
                    <button
                      disabled={!userProfileUrl(post.user.id)}
                      onClick={() => handleLink(post.user.id)}
                      className="font-semibold text-lg flex"
                    >
                      {post.user.username}
                    </button>
                    {post?.location && <p className="-mt-1">{post.location}</p>}
                  </div>

                  {!ownPost ? (
                    <button
                      disabled={post.user.followerIds.includes(userId!)}
                      className={classNames("rounded-md px-2 py-1 ml-2", {
                        "bg-green-500 text-white border border-green-500":
                          post.user.followerIds.includes(userId!),
                        "bg-open-blue text-white hover:bg-white border border-open-blue hover:text-open-blue transition-all duration-300":
                          !post.user.followerIds.includes(userId!),
                      })}
                    >
                      {post.user.followerIds.includes(userId!)
                        ? "FOLLOWING"
                        : "FOLLOW"}
                    </button>
                  ) : (
                    <button
                      className="ml-10"
                      onClick={() => handleAppendModal("delete-post", post.id)}
                    >
                      <MdDelete className="text-red-500" size={24} />
                    </button>
                  )}
                </div>
                <button
                  className="ml-auto self-start"
                  onClick={() => handleDeleteModal()}
                >
                  <IoMdClose className="text-red-500" size={24} />
                </button>
              </div>
              {post?.caption && (
                <>
                  <p>{post?.caption?.slice(0, 30)}</p>
                  {post?.caption?.length! > 30 && isMore && (
                    <>{post?.caption?.slice(30)}</>
                  )}
                  {post?.caption?.length! > 30 && (
                    <button
                      onClick={() => setIsMore((prev) => !prev)}
                      type="button"
                      className={classNames(
                        "text-blue-500 ml-2 font-semibold text-xs"
                      )}
                    >
                      {isMore ? "Less" : "More"}
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="flex flex-col gap-y-3 p-4 flex-auto overflow-auto">
              {comments?.length! > 0 ? (
                comments?.map((comment: CommentItem) => (
                  <div className="flex gap-x-2" key={comment.id}>
                    <button
                      disabled={!userProfileUrl(comment.user.id)}
                      onClick={() => handleLink(comment.user.id)}
                    >
                      <Image size={12} url={comment.user.avatar!} />
                    </button>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-x-2">
                        <button
                          disabled={!userProfileUrl(comment.user.id)}
                          onClick={() => handleLink(comment.user.id)}
                        >
                          <p className="font-semibold ">
                            {comment.user.username}
                          </p>
                        </button>
                        <p>{comment.content}</p>
                      </div>
                      <p>{calculateTime(new Date(comment.createdAt))}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-full font-semibold text-2xl">
                  There are no comments!
                </div>
              )}
            </div>

            <div className="flex flex-col p-4 gap-y-2 border-y">
              <div className="flex items-center gap-x-8">
                <button
                  disabled={likeLoading || unlikeLoading}
                  type="button"
                  onClick={() => {
                    isLiked ? handleUnlike(post.id) : handleLike(post.id);
                  }}
                >
                  {isLiked ? (
                    <AiFillHeart size={30} className="text-red-500" />
                  ) : (
                    <AiOutlineHeart size={30} />
                  )}
                </button>
                <button type="button" onClick={() => inputRef.current?.focus()}>
                  <FaRegComment size={26} />
                </button>
                <button
                  type="button"
                  className="ml-auto"
                  disabled={favoriteLoading || unfavoriteLoading}
                  onClick={() => {
                    isFavorite
                      ? handleUnfavorite(post.id)
                      : handleFavorite(post.id);
                  }}
                >
                  {isFavorite ? (
                    <FaBookmark size={25} />
                  ) : (
                    <FaRegBookmark size={25} />
                  )}
                </button>
              </div>
              <p className="font-semibold text-lg">{post.likes.length} likes</p>
              <p className="text-sm text-dark-gray">
                {calculateTime(post.createdAt)}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-4 flex items-center">
              <input
                type="text"
                ref={inputRef}
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                className="outline-none w-full"
                placeholder="Add a comment..."
              />
              <button
                type="submit"
                disabled={commentValue.trim() === ""}
                className="text-open-blue font-semibold text-lg px-3 disabled:text-open-blue/20"
              >
                Post
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
