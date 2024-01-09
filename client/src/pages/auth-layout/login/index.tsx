import { Formik, Form } from "formik";
import { useEffect, useRef } from "react";
import Button from "src/components/auth/button";
import Input from "src/components/auth/input";
import OrDivider from "src/components/auth/or-divider";
import { loginSchema } from "src/validation/loginSchema";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "src/store/api/auth-api-slice";
import { selectCurrentToken, setCredentials, setUser } from "src/store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { getCookieItem } from "src/utils/getCookieItem";
import toast from "react-hot-toast";
import FirstLoader from "src/components/loaders/first-loader";

interface FormInterface {
  email: string;
  password: string;
}
export default function Login() {
  const imagesContainer = useRef<HTMLDivElement | null>(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = async (values: FormInterface) => {
    try {
      const {message,id, token} = await login(values).unwrap();

      dispatch(setCredentials(token));
      dispatch(setUser(id))
      toast.success(message)
      navigate("/", {
        replace: true,
      }); 
    } catch (err: any) {
      
      toast.error(err.data.message);
      
    }
  };

  useEffect(() => {
    let i = 0;
    const length = imagesContainer.current?.children.length!;

    const intervalId = setInterval(() => {
      imagesContainer.current?.children[i].classList.add("opacity-0");
      i === length - 1 ? (i = 0) : i++;
      imagesContainer.current?.children[i].classList.remove("opacity-0");
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (isLoading)
    return (
      <div className="h-full w-full grid place-items-center">
        <FirstLoader />
      </div>
    );
  return (
    <div className="flex items-center justify-center gap-x-14 h-full">
      {/* IMAGE SECTION */}
      <div
        ref={imagesContainer}
        className="bg-instagram-phone  bg-[length:468.32px_634.15px] h-[581.15px] mb-3 bg-no-repeat w-[380.32px] bg-[top_left_-46px] relative"
      >
        <img
          src="https://static.cdninstagram.com/images/instagram/xig/homepage/screenshots/screenshot1.png?__d=www"
          alt="First image"
          className="top-[27px] right-5 absolute  transition-all duration-[1.5s]"
        />
        <img
          src="https://static.cdninstagram.com/images/instagram/xig/homepage/screenshots/screenshot2.png?__d=www"
          alt="Second image"
          className="top-[27px] right-5 absolute opacity-0 transition-all duration-[1.5s]"
        />
        <img
          src="https://static.cdninstagram.com/images/instagram/xig/homepage/screenshots/screenshot3.png?__d=www"
          alt="Third image"
          className="top-[27px] right-5 absolute opacity-0 transition-all duration-[1.5s]"
        />
        <img
          src="https://static.cdninstagram.com/images/instagram/xig/homepage/screenshots/screenshot4.png?__d=www"
          alt="Fourth image"
          className="top-[27px] right-5 absolute opacity-0 transition-all duration-[1.5s]"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="max-w-[350px] w-[350px] mt-3 space-y-[10px]">
        {/* LOGIN FORM */}
        <div className="border py-6 px-10 w-full flex-col flex">
          <span className="h-16 block w-auto mb-6 mx-auto">
            <img
              src="/images/instagram-logo.png"
              alt="Instagram logo"
              className="h-full w-auto"
            />
          </span>

          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form className="flex flex-col gap-y-1">
                <Input label="Email" name="email" />
                <Input label="Password" name="password" value="password" />
                <div className="mt-2">
                  <Button
                    type="submit"
                    disabled={!isValid || isSubmitting || !dirty}
                  >
                    Log in
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <OrDivider />

          <Link
            to={"/auth/reset"}
            className="text-xs text-blue-900 mt-4 text-center"
          >
            Forgot password?
          </Link>
        </div>

        {/* GO TO SIGN UP */}
        <div className="border py-6 w-full flex items-center justify-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              to={"/auth/register"}
              className="text-open-blue font-semibold "
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
