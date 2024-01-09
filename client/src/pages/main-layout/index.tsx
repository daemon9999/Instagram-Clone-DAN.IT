import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import TimelineLoader from "src/components/loaders/timeline-loader";
import ModalLayout from "src/components/modal-layout";
import Header from "src/components/site/header";
import modalsData from "src/data/modalsData";
import { RootState } from "src/store";

import { selectCurrentToken } from "src/store/auth-slice";

export default function MainLayout() {
  const { modals } = useSelector((state: RootState) => state.modal);
  
  
  
  return (
    <>
      {modals.length > 0 &&
        modals.map((m, key) => {
          const openedModal = modalsData.find((modal) => modal.name === m.name);
          if (openedModal) {
            return <ModalLayout key={key}><openedModal.element data={m.data} /></ModalLayout>
          }
        })}
        <Toaster />
      <Header />
      <main className="w-3/5 mx-auto container   h-full ">
        <Outlet />
      </main>

      <style>{`
          ${modals.length > 0 && "body{overflow:hidden;}"}
        `}</style>
    </>
  );
}
