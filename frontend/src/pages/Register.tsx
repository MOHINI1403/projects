import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
// defining the type for type-script
export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const Register = () => {
  // now once the registration is done we want to navigate the user to the home page for this we would use react-router-dom
  const navigate = useNavigate();

  const {showToast} =useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>(); // destructuring the register function from the useForm()
  // this is going to do a lot of validations on the backend

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({message:"Registration Success ",type:"SUCCESS"});
      console.log("Success ");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({message:error.message,type:"ERROR"});
      //console.log({ messgae: error.message });
    },
  });
  const onSumit = handleSubmit((data) => {
    // this would pass this to the POST request to the APIClient
    mutation.mutate(data);
    console.log(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSumit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>

      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal hover:shadow-gray transition-shadow duration-300"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && (
            <span className="text-red-600">{errors.firstName.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal hover:shadow-gray transition-shadow duration-300"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && (
            <span className="text-red-600">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal hover:shadow-gray transition-shadow duration-300"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal hover:shadow-gray transition-shadow duration-300"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password should be of minimum length 6",
            },
          })}
        ></input>
        {errors.password && (
          <span className="text-red-600">{errors.password.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal hover:shadow-gray transition-shadow duration-300"
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "This field is Required";
              }
              //react-hook-form has given a way to validate the confirm Password
              else if (watch("password") != value) {
                return "Your Passwords don't match !";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className="text-red-600">{errors.confirmPassword.message}</span>
        )}
      </label>

      <span>
        <button
          type="submit"
          className="bg-blue-600 rounded-md text-white p-2 font-bold hover:bg-blue-500 text xl"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};
export default Register;
