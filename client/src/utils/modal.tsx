import { appendModal, deleteModal } from "src/store/modal-slice";
import store from "../store";





export const handleAppendModal = (name: string, data: boolean | any = false) => store.dispatch(appendModal({name, data}))
export const handleDeleteModal = () => store.dispatch(deleteModal())