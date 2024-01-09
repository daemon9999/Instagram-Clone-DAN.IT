import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearData } from "src/store/add-post-slice";
import { handleDeleteModal } from "src/utils/modal";

interface ModalLayoutProps {
  children: React.ReactNode;
}

export default function ModalLayout({ children }: ModalLayoutProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;

      if (
        target &&
        target.classList &&
        target.classList.value.includes("modal-layout")
      ) {
        handleDeleteModal();
        dispatch(clearData());
      }
    });
  }, []);
  return (
    <>
      <div className="w-full h-full fixed bg-black/40 top-0 left-0 flex items-center justify-center modal-layout  z-50">
        {children}
      </div>
    </>
  );
}
