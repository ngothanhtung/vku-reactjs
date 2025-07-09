import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const phoneRegExp = /^[0-9]{10,15}$/;
const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/;

const schema = yup
  .object({
    firstName: yup
      .string()
      .required("First Name is required")
      .min(2, "First Name must be at least 2 characters"),
    lastName: yup
      .string()
      .required("Last Name is required")
      .min(2, "Last Name must be at least 2 characters"),
    phone: yup
      .string()
      .required("Phone Number is required")
      .matches(phoneRegExp, "Phone must be 10–15 digits"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        passwordRegExp,
        "Password must be 8+ characters, include uppercase, lowercase, number, no spaces"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    newsletter: yup.boolean().optional().default(false), // Optional
    agree: yup
      .boolean()
      .oneOf([true], "You must agree to the terms")
      .required(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

export default function Form02Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("✅ Form submitted:", data);
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="w-full lg:w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl font-semibold mb-4 text-center">
          A few clicks away from creating your Lottery Display
        </h1>
        <img
          src="https://nhannn87dn.github.io/ui-form-antd-yup/statics/img/lottery-display.svg"
          alt="Lottery Display"
          className="w-60 h-auto"
        />
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 bg-white p-10 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2">Register</h2>
        <p className="text-gray-600 mb-6">
          Manage all your lottery efficiently
        </p>

        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name + Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                {...register("firstName")}
                placeholder="First Name (*)"
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Last Name (*)"
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Phone + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="tel"

                {...register("phone")}
                placeholder="Phone Number (*)"
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email (*)"
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Password + Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password (*)"
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password (*)"
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* Newsletter + Terms */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("newsletter")} />
              Yes, I want to receive Lottery Display emails
            </label>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" {...register("agree")} />
              <span>
                I agree to all the{" "}
                <a href="#" className="text-blue-600 underline">
                  Term, Privacy Policy and Fees
                </a>
              </span>
            </label>
            {errors.agree && (
              <p className="text-red-500 text-sm">{errors.agree.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!isValid}
          >
            Create Account
          </button>

          <p className="text-sm text-center text-gray-600 mt-2">
            Already have an account?{" "}
            <a href="#" className="text-blue-600 underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
