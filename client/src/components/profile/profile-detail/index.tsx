import classNames from "classnames";
import toast from "react-hot-toast";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";
import { useFollowUserMutation, useUnfollowUserMutation } from "src/store/api/user-api-slice";
import { selectUserId } from "src/store/auth-slice";
import { handleAppendModal } from "src/utils/modal";

interface ProfileDetailProps {
  user: UserItem;
}
export default function ProfileDetail({ user }: ProfileDetailProps) {
  const [follow, {isLoading: followLoading}] = useFollowUserMutation()
  const [unfollow, {isLoading: unfollowLoading}] = useUnfollowUserMutation()
  const userId = useSelector(selectUserId)
  const isCurrentUser = userId === user.id
  const isFollowing = user.followerIds.includes(userId as string)


  const handleFollow = async() => {
    try {

      const {message} = isFollowing ? await unfollow({followingId: user.id}).unwrap() : await follow({followingId: user.id}).unwrap()
      toast.success(message)
    } catch  {
      toast.error("Unsuccessfull!")
    }
  }
  console.log(user.createdAt)
  const data = {
    email: user.email,
    username: user.username,
    avatar: user.avatar,
    createdAt: user.createdAt,
    bio: user.bio,
    fullName: user.fullName
  }
  return (
    <div className="flex flex-col gap-y-6 flex-auto self-start">
      <div className="flex items-center gap-x-5">
        <h3 className="text-3xl font-semibold ">{user.username}</h3>
        {isCurrentUser ? (<IoMdSettings onClick={() => handleAppendModal('edit-profile', data)} className="cursor-pointer" size={30} />) :
        (
          <button disabled={followLoading || unfollowLoading} onClick={handleFollow} className={classNames("px-2 py-1 font-semibold rounded-md ml-3 transition-all duration-300",{
            "bg-red-500 text-white border border-red-500 hover:bg-white hover:text-red-500 ": isFollowing,
            "bg-green-500 text-white border border-green-500 hover:bg-white hover:text-green-500": !isFollowing
          })}>{isFollowing ? "UNFOLLOW" : "FOLLOW" }</button>
        )}
      </div>
      <div className="flex items-center gap-x-10">
        <p className="text-lg">
          <strong>{user.posts?.length || 0}</strong> posts
        </p>
        <p className="text-lg">
          <strong>{user.followerIds.length || 0}</strong> followers
        </p>
        <p className="text-lg">
          <strong>{user.followingIds?.length || 0}</strong> followings
        </p>
      </div>
      <h4 className="font-semibold text-lg">{user.fullName}</h4>
      {user.bio && <p className="text-lg">{user.bio}</p>}
    </div>
  );
}
