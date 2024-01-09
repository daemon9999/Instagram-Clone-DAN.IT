
import toast from "react-hot-toast";

import ModalHeader from "../modal-header";
import { handleDeleteModal } from "src/utils/modal";
import { useDeletePostMutation } from "src/store/api/post-api-slice";
interface DeletePostModalProps {
  data: string;
}
export default function DeletePostModal({
  data: postId,
}: DeletePostModalProps) {
  const [deletePost, {isLoading}] = useDeletePostMutation()
  
  const handleDelete = async() => {
   
    try {
      const {message} = await deletePost({postId}).unwrap()

      toast.success(message)
      window.location.reload()
    } catch  (err){
      console.log(err)
      toast.error("Unsuccessfull!")
    }
  }
  return (
    <div className="bg-white w-96  rounded-xl">
      <ModalHeader isBack={false} isNext={false} label={"Delete Post"} />

      <div className="flex flex-col items-center justify-center p-10 gap-y-10">
        <p className="text-lg font-semibold text-slate-700">
          Are you sure to delete this post?
        </p>
        <div className="flex items-center justify-center gap-x-3 font-medium">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="border w-[100px] py-2 rounded-md border-red-500 bg-red-500 text-white hover:bg-white hover:text-red-500 transition-all"
          >
            Yes
          </button>
          <button
            onClick={handleDeleteModal}
            disabled={isLoading}
            className="border w-[100px] py-2 rounded-md border-slate-500 bg-slate-500 text-white hover:bg-white hover:text-slate-500 transition-all"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
