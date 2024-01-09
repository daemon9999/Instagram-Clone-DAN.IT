import AddPostModal from "src/components/modal-layout/add-post-modal";
import DeletePostModal from "src/components/modal-layout/delete-post-modal";
import EditProfileModal from "src/components/modal-layout/edit-profile-modal";
import PostDetailModal from "src/components/modal-layout/post-detail-modal";

const modalsData: ModalItem[] = [
  {
    name: "add-post",
    element: AddPostModal,
  },
  {

    name: "delete-post",
    element: DeletePostModal,
  },
  {

    name: "post-detail",
    element: PostDetailModal,
  },
  {
    name: 'edit-profile',
    element: EditProfileModal
  }
];

export default modalsData;
