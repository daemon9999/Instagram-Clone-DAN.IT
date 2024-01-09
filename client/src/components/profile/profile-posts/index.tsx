import { HiTemplate } from "react-icons/hi";
import { IoMdLock } from "react-icons/io";
import { useSelector } from "react-redux";
import InfoMessage from "src/components/site/info-message";
import { selectUserId } from "src/store/auth-slice";
import { handleAppendModal } from "src/utils/modal";
interface ProfilePostsProps {
  user: UserItem;
}
export default function ProfilePosts({ user }: ProfilePostsProps) {
  const userId = useSelector(selectUserId);
  const isCurrentUser = userId === user.id;
  const isFollowing = user.followerIds.includes(userId as string);
  
  return (
    <div className="mt-10 mx-auto flex flex-col gap-y-5 w-full">
      <div className="flex items-center gap-x-3 self-center">
        <HiTemplate size={24} />
        <p className="font-semibold">POSTS</p>
      </div>
      <span className="h-px bg-black w-full " />

      {(isCurrentUser || isFollowing) ? (
        !!user.posts && user.posts.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {user.posts.map((post) => (
              <div onClick={() => handleAppendModal('post-detail', post.id)} key={post.id} className="w-full h-[200px] cursor-pointer shadow-md">
                <img src={post.imageUrl} alt="" className="w-full h-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex  justify-center ">
            <InfoMessage>
              {!isCurrentUser
                ? `${user.username} hasn't shared any posts yet...`
                : "You haven't shared any posts yet..."}
            </InfoMessage>
          </div>
        )
      ) : (
        <div className="flex items-center justify-center flex-col gap-y-3">
          <IoMdLock size={100} />
          <p className="text-4xl font-semibold">This account is private!</p>
        </div>
      )}
    </div>
  );
}
