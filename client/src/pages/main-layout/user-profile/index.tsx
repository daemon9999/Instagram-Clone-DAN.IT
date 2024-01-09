import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProfileLoader from "src/components/loaders/profile-loader";
import Image from "src/components/profile/image";
import ProfileDetail from "src/components/profile/profile-detail";
import ProfilePosts from "src/components/profile/profile-posts";

import { useGetUserProfileQuery } from "src/store/api/user-api-slice";
import { selectUserId } from "src/store/auth-slice";

export default function UserProfile() {
    const {id} = useParams()
    const userId = useSelector(selectUserId)
    const { data: user, isLoading }= useGetUserProfileQuery({userId: id});
      
    if (isLoading) {
      return (
        <section className="flex items-center justify-center h-[80vh] ">
          <ProfileLoader />
        </section>
      );
    }
  
    return (
      <section className="h-full py-8 bg-white px-10">
        <div className="flex flex-col">
          <div className="flex items-center">
            <div className="w-1/3"><Image size={36} url={user?.avatar} /></div>
            <ProfileDetail user={user}/>
          </div>
  
          <ProfilePosts user={user}/>
            
        </div>
      </section>
    );
}