import classNames from "classnames";
import { RefObject, useEffect, useRef } from "react";

type MessageType = {
  id: number;
  type: "you" | "other";
  content: string;
};

export default function MessageContent() {
  const messages: MessageType[] = [
    {
      id: 1,
      type: "you",
      content:
        "salam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesensalam necesen",
    },
    {
      id: 2,
      type: "other",
      content: "salam necesen",
    },
    {
      id: 3,
      type: "you",
      content: "salam necesen",
    },
    {
      id: 4,
      type: "other",
      content: "salam necesen",
    },
  ];
  const chatContainer = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop! = chatContainer.current.scrollHeight;
    }
  }, []);
  return (
    <div ref={chatContainer} className="px-3 py-2 overflow-auto chat-container">
      <div className="flex flex-col gap-2">
        {messages.map((message: MessageType) => (
          <div
            key={message.id}
            className={classNames("items-start flex gap-x-3", {
              "self-end flex-row-reverse": message.type === "you",
              "self-start flex-row": message.type === "other",
            })}
          >
            <span className="inline-block w-6 h-6">
              <img
                className="w-full h-full rounded-full"
                src="https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome.png"
                alt="User's image"
              />
            </span>
            <p
              className={classNames("rounded-lg px-2 py-1 max-w-[300px]", {
                "bg-open-blue text-white": message.type === "you",
                "bg-gray-100": message.type === "other",
              })}
            >
              {message.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
