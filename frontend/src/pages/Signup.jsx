import { useForm } from "react-hook-form";
import {
  Eye,
  EyeSlash,
  ArrowLeft,
  ArrowClockwise,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsModalVisible,
  setSignupFormData,
} from "../redux/slices/globalSlice";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import axios from "axios";

const Signup = () => {
  const { handleSubmit, reset, register } = useForm();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);
  const dispatch = useDispatch();
  const signupFormData = useSelector((store) => store.global.signupFormData); //*need email to resend otp
  const navigate = useNavigate();

  //   *register user in db for first time
  const registerUser = async () => {
    setLoading(true);
    const toastId = toast.loading("Registering User...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/signup`,
        { ...signupFormData, otp }
      );
      if (response.data?.success) {
        toast.success("User Registered!", { id: toastId });
        navigate("/");
        dispatch(setIsModalVisible(true));
      }
    } catch (error) {
      //console.log(error);
      toast.error(error.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  //   *sending or resending otp to user's email
  const sendOtp = async (data) => {
    dispatch(setSignupFormData(data)); //*setting data in global slice, so that it can be used afterwards
    setLoading(true);
    const toastId = toast.loading("Sending OTP...");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/otp`,
        { email: data.email }
      );
      if (response.data?.success) {
        toast.success("OTP Send", { id: toastId });
        reset();
        setIsOtpSend(true);
      }
    } catch (error) {
      //console.log(error);
      toast.error(error.response?.data?.message || "An error occurred", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {/* based on otp is sent or not we are showing otp or signup div */}
      <div className="flex-1 flex flex-col justify-center items-center">
        {isOtpSend ? (
          <div className="bg-white rounded-lg py-6 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <h1 className="text-text-primary text-3xl font-medium text-center mb-4">
              Verify OTP
            </h1>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "50px",
                height: "50px",
                margin: "8px",
                fontSize: "20px",
                textAlign: "center",
                border: "2px solid #ccc",
                borderRadius: "5px",
                color: "#545744",
              }}
            />
            <button
              onClick={registerUser}
              className="bg-btn-primary w-full py-2 mt-4 rounded-md text-white text-center cursor-pointer"
              disabled={loading}
            >
              Submit
            </button>
            <div className="flex justify-between mt-2 text-text-primary">
              <button
                onClick={() => {
                  setIsOtpSend(false);
                }}
                className="cursor-pointer"
              >
                <ArrowLeft />
              </button>
              <button
                disabled={loading}
                onClick={() => {
                  sendOtp(signupFormData);
                }}
                className="flex gap-1 cursor-pointer items-center"
              >
                Resend <ArrowClockwise />
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg pt-4 pb-10 px-4">
            <h2 className="text-center px-6 text-text-primary text-3xl font-medium mt-2">
              Signup
            </h2>
            <p className="text-text-primary px-6 text-center mb-10">
              Welcome! Please signup to continue
            </p>
            <form
              onSubmit={handleSubmit(sendOtp)}
              className="flex flex-col gap-4 md:w-80 mx-auto"
            >
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                required
                className="px-4 py-2 text-text-primary border-[1px] border-text-primary w-full rounded-full"
              />
              <input
                {...register("email")}
                type="email"
                placeholder="Email id"
                required
                className="px-4 py-2 text-text-primary border-[1px] border-text-primary w-full rounded-full"
              />
              <div className="relative">
                <input
                  {...register("password")}
                  placeholder="Password"
                  type={isPasswordVisible ? "text" : "password"}
                  className="pl-4 pr-10 py-2 text-text-primary border-[1px] border-text-primary w-full rounded-full"
                  required
                />
                {isPasswordVisible ? (
                  <EyeSlash
                    onClick={() => {
                      setIsPasswordVisible((prev) => !prev);
                    }}
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  />
                ) : (
                  <Eye
                    onClick={() => {
                      setIsPasswordVisible((prev) => !prev);
                    }}
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  />
                )}
              </div>
              <button
                disabled={loading}
                className="text-white bg-[rgb(0,122,255)] cursor-pointer py-2 text-center rounded-full"
              >
                Signup
              </button>
            </form>
            <p className="flex justify-center mt-5">
              <span className="text-text-primary">Have an account?</span>{" "}
              <Link
                onClick={() => {
                  dispatch(setIsModalVisible(true));
                }}
                to="/"
                className="text-[rgb(0,122,255)] ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
};
export default Signup;
