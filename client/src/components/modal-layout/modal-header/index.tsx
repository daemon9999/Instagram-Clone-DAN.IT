import classNames from "classnames";

import { BiArrowBack } from "react-icons/bi";

import { useDispatch } from "react-redux";
import { changeStep } from "src/store/add-post-slice";

interface ModalHeaderProps {
    label: string
    isBack?: boolean
    isNext?: boolean | string | null
}

const ModalHeader = ({ isBack = false, isNext = false, label }: ModalHeaderProps) => {
  const dispatch = useDispatch()
  return (
    <div
      className={classNames("flex items-center p-4 border-b ", {
        "justify-between": isBack,
      })}
    >
      {isBack && (
        <span
          onClick={() => dispatch(changeStep("back"))}
          className="text-red-500  cursor-pointer"
        >
          <BiArrowBack size={30} />
        </span>
      )}
      <p className={classNames("mx-auto font-medium text-xl tracking-wide")}>
        {label}
      </p>
      {isNext && (
        <p
          onClick={() => dispatch(changeStep("next"))}
          className="text-blue-500 font-medium cursor-pointer text-lg"
        >
          Next
        </p>
      )}
    </div>
  );
};

export default ModalHeader;