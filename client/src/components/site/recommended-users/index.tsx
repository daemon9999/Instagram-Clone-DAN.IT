import classNames from "classnames";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Image from "src/components/profile/image";
import { useFollowUserMutation } from "src/store/api/user-api-slice";

interface RecommendedUsersProps {
  users: {
    id: string;
    username: string;
    fullName: string;
    avatar?: string;
  }[];
}

export default function RecommendedUsers({ users }: RecommendedUsersProps) {
  return (
    <div className="my-4 flex flex-col gap-y-2">
      <div><h2 className="font-semibold text-3xl bg-white px-3 py-2  shadow-sm inline-block rounded-md">Recommended Users To Follow</h2></div>
      <div className="flex gap-x-3 ">
        {users.map((u) => (
          <UserItem user={u} key={u.id} />
        ))}
      </div>
    </div>
  );
}

function UserItem({
  user,
}: {
  user: {
    id: string;
    username: string;
    fullName: string;
    avatar?: string;
  };
}) {
    const [follow, {isLoading}] = useFollowUserMutation() 
    const [isFollowed, setIsFollowed] = useState<boolean>(false)
    const handleFollow = async() => {
        try {
            const data = await follow({followingId: user.id}).unwrap()
            setIsFollowed(true)
            toast.success(data.message)
            
        } catch (err: any) {
            toast.error(err.data.message)
        }

    }
  return (
    <div className="bg-white gap-y-1 p-4 w-52 h-52 flex flex-col items-center justify-center rounded-lg shadow-sm">
      <Link to={`/${user.id}`}><Image size={16} url={user.avatar} /></Link>
      <Link to={`/${user.id}`}><p className="font-semibold text-lg">{user.fullName}</p></Link>
      <Link to={`/${user.id}`}><p>{user.username}</p></Link>
      <button
        type="button"
        onClick={handleFollow}
        disabled={isFollowed || isLoading}
        className={classNames(" py-1  w-full rounded-lg ",{
            "bg-open-blue text-white border border-open-blue hover:bg-white hover:text-open-blue transition-all duration-300": !isFollowed,
            "bg-secondary ": isFollowed
        })}
      >
        Follow
      </button>
    </div>
  );
}
