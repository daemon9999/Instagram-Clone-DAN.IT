import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "src/components/auth/button";
import Input from "src/components/auth/input";
import OrDivider from "src/components/auth/or-divider";
import { useRegisterMutation } from "src/store/api/auth-api-slice";
import { setCredentials, setUser } from "src/store/auth-slice";

import { registerSchema } from "src/validation/registerSchema";
import toast from "react-hot-toast";
import FirstLoader from "src/components/loaders/first-loader";
interface FormInterface {
  email: string;
  fullName: string;
  username: string;
  password: string;
}

export default function Register() {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (values: FormInterface) => {
    try {
      const {token,id, message} = await register(values).unwrap();
      
      dispatch(setCredentials(token));
      dispatch(setUser(id));
      toast.success(message) 
      navigate("/", {
        replace: true,
      }); 
    } catch(err: any) {
      toast.error(err.data.message);
    }
  };
  if (isLoading) {
    return (
      <div className="h-full w-full grid place-items-center">
        <FirstLoader />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center h-full">
      <div className="max-w-[350px] w-[350px] space-y-3">
        {/* REGISTER FORM */}
        <div className="w-full border px-8 py-6 flex flex-col gap-y-4 pb-10">
          <span className="block h-16 w-auto mx-auto">
            <img
              src="/images/instagram-logo.png"
              className="h-full w-auto"
              alt="Instagram Logo"
            />
          </span>
          <p className="text-dark-gray font-semibold  text-center">
            Sign up to see photos and videos from your friends.
          </p>
          <OrDivider />

          <Formik
            initialValues={{
              fullName: "",
              username: "",
              email: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty, isSubmitting }) => (
              <Form className="flex flex-col gap-x-2">
                <Input label="Email" name="email" />
                <Input label="Full Name" name="fullName" />
                <Input label="Username" name="username" />
                <Input label="Password" name="password" value="password" />
                <p className="text-xs text-dark-gray text-center my-3 px-3">
                  People who use our service may have uploaded your contact
                  information to Instagram.{" "}
                  <Link
                    to={
                      "https://www.facebook.com/help/instagram/261704639352628"
                    }
                    target="_blank"
                    className="text-blue-900"
                  >
                    Learn More
                  </Link>
                </p>
                <p className="text-xs text-dark-gray text-center mt-3 mb-4 px-3">
                  By signing up, you agree to our{" "}
                  <Link
                    to={
                      "https://help.instagram.com/581066165581870/?locale=en_US"
                    }
                    target="_blank"
                    className="text-blue-900"
                  >
                    Terms
                  </Link>{" "}
                  ,{" "}
                  <Link
                    to={"https://www.facebook.com/privacy/policy"}
                    target="_blank"
                    className="text-blue-900"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    to={"https://privacycenter.instagram.com/policies/cookies/"}
                    target="_blank"
                    className="text-blue-900"
                  >
                    Cookies Policy
                  </Link>{" "}
                  .
                </p>
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || !dirty}
                >
                  Sign up
                </Button>
              </Form>
            )}
          </Formik>
        </div>

        {/* GO TO SIGN IN */}
        <div className="border py-6 w-full flex items-center justify-center">
          <p className="text-sm">
            Have an account?{" "}
            <Link className="text-open-blue" to={"/auth/login"}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
