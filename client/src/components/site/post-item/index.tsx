import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { calculateTime } from "src/utils/calculateTime";
import { FaRegComment, FaBookmark, FaRegBookmark } from "react-icons/fa";
import CommentDescription from "../comment-description";
import CommentInput from "../comment-input";
import { useEffect, useRef, useState } from "react";
import { Link, To, useNavigate } from "react-router-dom";
import Image from "src/components/profile/image";
import toast from "react-hot-toast";
import { QueryStatus } from "@reduxjs/toolkit/query";
import { useGetPostCommentsQuery } from "src/store/api/comment-api-slice";
import { handleAppendModal } from "src/utils/modal";
import { useSelector } from "react-redux";
import { selectUserId } from "src/store/auth-slice";


interface PostItemProps {
  post: PostItem;
  
  handleLike: (postId: string) => void
  handleUnlike: (postId: string) => void
  handleFavorite: (postId: string) => void
  handleUnfavorite: (postId: string) => void
  likeLoading: boolean
  unlikeLoading: boolean,
  status: QueryStatus
}

export default function PostItem({
  post,
  handleFavorite,
  handleUnfavorite,
  handleLike,
  handleUnlike,

}: PostItemProps) {
 
  const {data: comments} = useGetPostCommentsQuery({postId:post.id})
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const userId = useSelector(selectUserId)
  const navigate = useNavigate()
  const userProfileUrl = (id: string) => {
    if (id === userId) {
      return false;
    }
    return `/${id}`;
  };
  const handleLink = (id: string) => {
    if (userProfileUrl(id)) {

      navigate(userProfileUrl(id) as To);
    }
  };
  return (
    <div className="w-3/5 flex flex-col gap-y-4 border-b pb-4 -mb-4">
      {/* POST HEADER */}

      <div className="flex items-center gap-x-3">
        <button disabled={!userProfileUrl(post.userId)} onClick={() => handleLink(post.userId)} className="block w-10 h-10 "> 
          <Image size={12} url={post?.user?.avatar!} />
        </button>
        <button disabled={!userProfileUrl(post.userId)} onClick={() => handleLink(post.userId)} className="font-semibold text-lg">
          {post.user.username}
        </button>
        <span>• {calculateTime(new Date(post.createdAt))}</span>
      </div>

      {/* POST IMG */}
      <span onClick={() => handleAppendModal('post-detail', post.id)} className="block w-full h-[400px] bg-black cursor-pointer" >
        <img
          src={post.imageUrl}
          alt={post.caption || "Image"}
          className="w-full h-full object-contain "
        />
      </span>

      {/* POST ACTIONS */}
      <div className="flex items-center gap-x-3">
        <button disabled={post.isLoading} type="button" onClick={() => {
          
          post.isLiked ? handleUnlike(post.id) : handleLike(post.id)
        }}>
          {post?.isLiked ? (
            <AiFillHeart size={30} className="text-red-500" />
          ) : (
            <AiOutlineHeart size={30} className="" />
          )}
        </button>
        <button type="button" onClick={() => inputRef.current?.focus()}>
          <FaRegComment size={26} />
        </button>
        <button
          type="button"
          className="ml-auto"
          onClick={() => {
            post.isFavorite ? handleUnfavorite(post.id) : handleFavorite(post.id)
          }}
        >
          {post.isFavorite ? <FaBookmark size={25} /> : <FaRegBookmark size={25} />}
        </button>
      </div>

      {/* LIKES COUNT */}
      <p className="font-semibold -mt-1">{post?.likes?.length || 0} likes</p>
      {post.caption && (
        <CommentDescription
          description={post.caption}
          username={post.user.username}
          sharedUser={true}
          userProfileUrl={userProfileUrl}
          handleLink={handleLink}
          userId={post.userId}
        />
      )}
      {comments?.length! > 2 && (
        <span  onClick={() => handleAppendModal("post-detail", post.id)} className="text-gray-500 text-sm cursor-pointer  -mt-2 ">
          View all {comments?.length} comments
        </span>
      )}
      {comments?.length! > 0 &&
        (comments?.length! <= 2 ? (
          comments?.map((comment: CommentItem) => (
            <CommentDescription
              description={comment.content}
              username={comment.user.username}
              sharedUser={false}
              userProfileUrl={userProfileUrl}
              handleLink={handleLink}
              userId={comment.user.id}
              key={comment.id}
            />
          ))
        ) : (
          <CommentDescription
            description={comments![0]?.content}
            username={comments![0]?.user.username}
            userProfileUrl={userProfileUrl}
            handleLink={handleLink}
            userId={comments[0].user.id}
            sharedUser={false}
          />
        ))}

      <CommentInput inputRef={inputRef} postId={post.id} />
    </div>
  );
}
