import { FaRegHeart } from "react-icons/fa";

export default function MessageInput() {
  return (
    <div className=" h-10 relative ">
      <input
        type="text"
        className="rounded-full outline-none border px-3 h-10 w-full   placeholder:text-gray-400"
      />
      <span className="h-10 w-10 flex items-center justify-center absolute top-0 right-2">
        <FaRegHeart size={24} className="cursor-pointer hover:text-red-500" />
      </span>
    </div>
  );
}
