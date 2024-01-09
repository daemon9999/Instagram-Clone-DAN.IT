import classNames from "classnames";

interface ImageProps {
  size: 10 | 12 | 16 | 24 | 36;
  url?: string;
}
export default function Image({ size, url }: ImageProps) {
  return (
    <span
      className={classNames("bg-black rounded-full overflow-hidden flex items-center justify-center", {
        "h-10 w-10": size === 10,
        "h-12 w-12": size === 12,
        "h-16 w-16 ": size === 16,
        "h-24 w-24 ": size === 24,
        "h-36 w-36": size === 36,
      })}
    >
      <img
        src={
          url
            ? url
            : "https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome.png"
        }
        alt={"User's image"}
        className="w-full object-contain"
      />
    </span>
  );
}
