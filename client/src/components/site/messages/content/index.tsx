import { directUserList } from "src/mock/directUsers";
import { PiWarningCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import MessageContent from "./message-content";
import MessageInput from "./message-input";

import { IoIosSend } from "react-icons/io";

interface ContentProps {
  activeDM: string | null;
}
export default function Content({ activeDM }: ContentProps) {
  const activeUser = directUserList.find((du) => du.id === activeDM);


  if (!activeUser) {
    return (
      <section className="flex flex-col gap-y-5 items-center justify-center flex-auto">
        
        <span className="p-5  border rounded-full text-black border-black">
        <IoIosSend  size={100}/>
        </span>
        <h3 className="text-3xl text-black font-semibold ">Your Messages</h3>
        <p className="text-dark-gray text-base -mt-3">Send private photos and messages to a friend</p>
      </section>
    )
  }
  return (
    <section id="messages-content" className="flex-auto flex flex-col ">
      <div className="flex items-center py-5 border-b pl-5 pr-3 gap-x-3">
        <Link to={"/"} className="w-6 h-6 rounded-full overflow-hidden">
          {" "}
          {/* TODO: Link will be changed */}
          <img
            src={activeUser?.profileImg}
            className="w-full h-full"
            alt={`${activeUser?.username}'s profile image`}
          />
        </Link>
        <Link to={"/"}>
          <h4 className=" font-semibold ">{activeUser?.username}</h4>
        </Link>{" "}
        {/* TODO: Link will be changed */}
        <Link to={"/"} className="ml-auto inline-block">
          <PiWarningCircle className="text-black " size={28} />
        </Link>{" "}
        {/* TODO: Link will be changed */}
      </div>

      <MessageContent />
      <div className="mt-auto px-3 py-2">
        <MessageInput />
      </div>
    </section>
  );
}
