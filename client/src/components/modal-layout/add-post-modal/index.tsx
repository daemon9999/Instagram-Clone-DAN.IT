import { useAddPost } from "src/utils/addPost"
import UploadImage from "./upload-image"
import EditPost from "./edit-post"

export default function AddPostModal() {
    const {step} = useAddPost()

  return (
    <>

        {step === 1 ? (
            <UploadImage/>
        ) : step === 2 ? (
          <EditPost />
        ) : null}

        
    </>
  )
}