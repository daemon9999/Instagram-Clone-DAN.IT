import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "src/store/auth-slice";
import EditInput from "./edit-input";
import { editProfileSchema } from "src/validation/editProfileSchema";
import convertDate from "src/utils/convertDate";
import { useCallback, useRef } from "react";
import { useAddPost } from "src/utils/addPost";
import { setBase64Image } from "src/store/add-post-slice";
import { useUpdateProfileMutation } from "src/store/api/user-api-slice";
import toast from "react-hot-toast";
interface EditProfileModalProps {
  data: {
    bio: string;
    avatar?: string;
    fullName: string;
    username: string;
    email: string;
    createdAt: string;
  };
}

interface ValuesProps {
  username: string;
  bio: string;
  fullName: string;
}
export default function EditProfileModal({ data }: EditProfileModalProps) {
  const { base64Image } = useAddPost();
  const [updateProfile] = useUpdateProfileMutation()
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handleUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      const reader = new FileReader();
      reader.onload = () => {
        const res = reader?.result;

        dispatch(setBase64Image(res));
      };
      reader.readAsDataURL(file);
    },
    [dispatch, setBase64Image]
  );

  const handleClick = useCallback(() => {
    fileRef?.current?.click();
  }, [fileRef?.current]);
  const handleSubmit = async (values: ValuesProps) => {
    try {
      const avatar = base64Image
        ? base64Image
        : data.avatar
        ? data.avatar
        : null;
      const bio = values.bio.trim() === "" ? null : values.bio;
      const { username, fullName } = values;
      const {message} = await updateProfile({username, fullName, bio, avatar}).unwrap()
      toast.success(message)
        window.location.reload()
    } catch (error : any) {
        toast.error(error.data.message)
    }
  };
  return (
    <div className="bg-white w-3/4 rounded h-3/4 flex">
      <div className="w-1/3 border-r-2 h-full flex gap-y-5 flex-col items-center justify-center">
        <h2 className="uppercase text-4xl font-semibold">Profile Photo</h2>
        <span className="w-52 h-52 bg-black rounded-full flex items-center justify-center overflow-hidden">
          <input
            type="file"
            accept="image/*"
            onChange={handleUploadImage}
            ref={fileRef}
            className="hidden"
          />
          <img
            onClick={handleClick}
            src={
              base64Image
                ? base64Image
                : data.avatar
                ? data.avatar
                : "https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome.png"
            }
            alt="Image"
            className="w-full object-contain  cursor-pointer"
          />
        </span>

        <button
          type="button"
          onClick={handleClick}
          className="font-semibold text-3xl bg-open-blue text-white px-4 py-3 rounded-lg hover:bg-white hover:text-open-blue border-open-blue border-2 transition-all duration-300  "
        >
          UPLOAD IMAGE
        </button>
      </div>

      <div className="w-2/3 h-full p-6 flex flex-col gap-y-3 ">
        <div className="text-xl">
          <strong>Email:</strong> {data.email}
        </div>

        <Formik
          initialValues={{
            username: data.username,
            fullName: data.fullName,
            bio: data.bio || "",
          }}
          validationSchema={editProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ isValid, isSubmitting }) => (
            <Form className="flex flex-col gap-y-3 ">
              <EditInput label="Full Name" name="fullName" />
              <EditInput label="Username" name="username" />
              <EditInput label="Bio" type="textarea" name="bio" />
              <div className="text-xl">
                <strong>Created Date:</strong> {convertDate(data.createdAt)}
              </div>
              <button
                disabled={isSubmitting || !isValid}
                type="submit"
                className="-mt-5 bg-open-blue disabled:bg-red-500  text-white font-semibold rounded-md w-[200px] ml-auto text-2xl px-3 py-2 "
              >
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
