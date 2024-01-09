
import { useDispatch, useSelector } from "react-redux";

import TimelineLoader from "src/components/loaders/timeline-loader";
import RecommendedUsers from "src/components/site/recommended-users";
import Timeline from "src/components/site/timeline";


import { useGetFollowedUserPostsQuery } from "src/store/api/post-api-slice";
import { useGetUsersNotFollowedQuery } from "src/store/api/user-api-slice";
import { selectCurrentToken, selectUserId } from "src/store/auth-slice";
export default function Home() {
    const token = useSelector(selectCurrentToken)
    const {data: users, isLoading} = useGetUsersNotFollowedQuery(token) 
    const {data: posts, isLoading: loading} = useGetFollowedUserPostsQuery(token)
   


  
   
    if (isLoading || loading ){
        return (
            <div className="h-[90vh] flex items-center justify-center">
                <TimelineLoader/>
            </div>
        )
    }
   
    return (
        <>
            <RecommendedUsers users={users}/>
            <Timeline posts={posts}/>
           
        </>
    )
}