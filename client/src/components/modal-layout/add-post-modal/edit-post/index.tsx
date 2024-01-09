import { useCallback } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { useAddPost } from "src/utils/addPost";
import ModalHeader from "../../modal-header";
import { Field, Form, Formik } from "formik";
import { FaLocationDot, FaMessage } from "react-icons/fa6";
import { useCreatePostMutation } from "src/store/api/post-api-slice";
interface FormInterface {
  caption: string;
  location: string;
}
export default function EditPost() {
  const { base64Image } = useAddPost();
  const { token } = useSelector((state: RootState) => state.auth);
    const [createPost] = useCreatePostMutation()
  const handleSubmit = useCallback(
    async (values: FormInterface) => {
        try {
            const data = await createPost({...values, imageUrl: base64Image}).unwrap()
            toast.success(data.message)
            window.location.reload()
        } catch (err: any) {
            toast.error(err.data.message)
            
        }
    },
    [token, base64Image]
  );
  return (
    <div className="bg-white w-3/4 ">
      <ModalHeader label={"Edit"} isBack={true} />

      <div className="flex h-[500px] ">
        <span className="w-1/2 p-4 flex h-full  items-center justify-center ">
          <img src={base64Image!} alt="Image" className="w-full h-full " />
        </span>

        <Formik
          initialValues={{
            caption: "",
            location: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="p-4 flex flex-col flex-auto gap-y-10">
              <div className="flex items-center gap-x-4 w-full">
                <FaMessage color="gray" size={28} />
                <Field
                  name="caption"
                  className="outline-none border-b h-12 text-lg w-full"
                  placeholder="Add a caption (optional)"
                />
              </div>
              <div className="flex items-center gap-x-4 w-full">
                <FaLocationDot color="gray" size={28} />
                <Field
                  name="location"
                  className="outline-none border-b h-12 text-lg w-full"
                  placeholder="Location (optional)"
                />
              </div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="bg-blue-500 mt-auto ml-auto hover:bg-blue-600 disabled:bg-blue-500/70 py-3 px-10 rounded-md text-lg font-medium text-white"
              >
                POST
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
