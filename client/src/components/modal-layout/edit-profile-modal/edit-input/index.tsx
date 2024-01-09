import classNames from "classnames";
import { useField } from "formik";
import { useCallback, useState } from "react";

interface InputProps {
  label: string;
  type?: string;
  name: string;
}

export default function EditInput({
  name,
  label,
  type = "text",
  ...props
}: InputProps) {
  const [field, meta] = useField(name);

  return (
    <div>
      <label className=" flex items-end gap-x-2">
        <span className={classNames("font-semibold text-xl",{
            "self-start": type==='textarea'
        })}>{label}:</span>
        {type === "textarea" ? (
          <textarea  className="outline-none border border-open-blue rounded resize-none px-2 py-1 w-1/2 h-[250px] text-lg"    {...props} {...field}></textarea>
        ) : (
          <input
            type="text"
            className={classNames(
              "outline-none border-b    border-open-blue cursor-auto text-xl   "
            )}
            {...props}
            {...field}
          />
        )}
      </label>
      {!!meta?.error && !!meta?.touched && (
        <p className="text-red-500 text-base capitalize ml-2 mt-1 ">
          {meta.error}
        </p>
      )}
    </div>
  );
}
