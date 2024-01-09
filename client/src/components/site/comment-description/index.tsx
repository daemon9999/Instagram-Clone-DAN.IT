import classNames from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
interface CommentDescription {
  username: string;
  description: string;
  sharedUser: boolean;
  userProfileUrl: (id: string) => string | false
  handleLink: (id: string) => void
  userId: string
}

export default function CommentDescription({
  username,
  description,
  sharedUser,
  handleLink,
  userProfileUrl,
  userId
}: CommentDescription) {
  const [isMore, setIsMore] = useState(false);
  return (
    <p className="-mt-3">
      <button disabled={!userProfileUrl(userId)} onClick={() => handleLink(userId)}  
        className={classNames("font-semibold", {
          "text-sm": !sharedUser,
          "text-base": sharedUser,
        })}
      >  
        {username}
      </button> 

      <span
        className={classNames("ml-2", {
          "text-sm": !sharedUser,
          "text-base": sharedUser,
        })}
      >
        {description?.slice(0, 100)}
        {description?.length! > 100 && isMore && <>{description?.slice(100)}</>}
        {description?.length! > 100 && (
          <button
            onClick={() => setIsMore((prev) => !prev)}
            type="button"
            className={
              classNames("text-blue-500 ml-2 font-semibold", {
                "text-xs": !sharedUser,
                "text-sm": sharedUser,
              }) 
            }
          >
            {isMore ? "Less" : "More"}
          </button>
        )}
      </span>
    </p>
  );
}
