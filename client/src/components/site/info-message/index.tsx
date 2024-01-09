import { PiWarningCircleFill } from "react-icons/pi";
interface InfoMessageProps {
  children: string;
}

export default function InfoMessage({ children }: InfoMessageProps) {
  return (
    <div className="px-4 py-3 rounded-md bg-black w-5/6 flex justify-between items-center">
      <h3 className="text-white text-2xl font-bold tracking-wider">
        {children}
      </h3>
      <PiWarningCircleFill className="text-white" size={34 } />
    </div>
  );
}
