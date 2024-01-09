import classNames from "classnames";
import { useState, useCallback, useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import SearchLoader from "src/components/loaders/search-loader";
import Image from "src/components/profile/image";
import { useSearchUsersQuery } from "src/store/api/user-api-slice";
import { selectUserId } from "src/store/auth-slice";
export default function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const userId = useSelector(selectUserId)
  const { data: users = [], isFetching } = useSearchUsersQuery(searchValue);
  const filteredUsers = users.filter((u: UserItem) => u.id !== userId)
  const navigate = useNavigate()
  const clearValue = useCallback(() => {
    setSearchValue("");
    inputRef.current?.focus();
  }, []);
  return (
    <div className="h-9 relative">
      <button className="absolute w-9 h-9 top-0 left-0 flex items-center justify-center text-gray-400">
        <AiOutlineSearch size={22} />
      </button>
      <input
        ref={inputRef}
        value={searchValue}
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        className="h-full w-[240px] border bg-secondary outline-none px-10 placeholder:text-gray-400 text-black rounded"
        placeholder="Search..."
      />

      {searchValue && (
        <button
          type="button"
          onClick={clearValue}
          className="w-9 h-9 flex items-center justify-center right-0 top-0 text-gray-400 absolute"
        >
          <IoMdClose size={22} />
        </button>
      )}

      {searchValue.trim() !== "" && (
        <div className={classNames("bg-white  w-full absolute top-full z-50 border mt-1 shadow-sm",{
          "h-[150px] flex items-center justify-center": isFetching,
          "h-[150px] flex items-center justify-center font-semibold text-3xl text-center": filteredUsers.length === 0 && !isFetching,
          "h-[200px] flex flex-col": filteredUsers.length > 0 && !isFetching,
          "h-auto": filteredUsers.length < 3
        })}>
          {isFetching ? (
            <SearchLoader />
          ) : filteredUsers.length > 0 ? (
            filteredUsers.map((user: UserItem) => (
              <button onClick={() => {
                navigate(`/${user.id}`)
                setSearchValue("")
              }} key={user.id} className="flex  p-2 border-b gap-x-2 hover:bg-open-blue hover:text-white cursor-pointer">
                <span className="w-10 h-10"><Image size={10} url={user?.avatar!}/></span>
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm -mt-1">{user.fullName}</p>
                </div>
              </button>
            ))
          ) : (
            "There are no users"
          )}
        </div>
      )}
    </div>
  );
}
