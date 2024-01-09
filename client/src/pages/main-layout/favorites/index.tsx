import { useMemo } from "react";
import { useSelector } from "react-redux";
import TimelineLoader from "src/components/loaders/timeline-loader";

import Timeline from "src/components/site/timeline";

import { useGetFavoritePostsQuery } from "src/store/api/favorite-api-slice";
import { selectCurrentToken } from "src/store/auth-slice";
export default function Favorites() {
  const token = useSelector(selectCurrentToken)
  const {data: favoritePosts, isLoading} = useGetFavoritePostsQuery(token)
  

  if (isLoading){
    return (
        <div className="h-[90vh] flex items-center justify-center">
            <TimelineLoader/>
        </div>
    )
}

return (
    <>
        <Timeline posts={favoritePosts}/>
       
    </>
)
}
