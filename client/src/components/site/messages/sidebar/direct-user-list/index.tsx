import { directUserList } from "src/mock/directUsers";
import { calculateTime } from "src/utils/calculateTime";
interface DirectUserListProps {
    handleActiveDM:  (activeId: string) => void
}
export default function DirectUserList({handleActiveDM}: DirectUserListProps) {
  return (
    <div className="flex flex-col overflow-auto ">
      {directUserList.map((directUser: DirectUserItem) => (
        <div key={directUser.id} onClick={() => handleActiveDM(directUser.id)} className="flex items-center gap-x-3 py-3 px-4 cursor-pointer hover:bg-gray-100">
          {/* USER IMAGE */}
          <span className="w-10 h-10 rounded-full overflow-hidden">
            <img
              className="w-full h-full "
              src={directUser.profileImg}
              alt={`${directUser.username}'s profile image`}
            />
          </span>

          {/* USER DETAIL */}
          <div className="flex flex-col ">
            <p className="font-semibold">{directUser.username}</p>
            <p className="text-sm text-gray-500">
              {directUser.message.length > 10 ? directUser.message.slice(0,10) + "...": directUser.message} •{" "}
              {calculateTime(new Date("2023-08-07T12:00:00"))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
