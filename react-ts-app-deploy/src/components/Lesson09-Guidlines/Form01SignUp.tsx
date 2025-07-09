import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

type FormData = yup.InferType<typeof signupSchema>;


import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Form01SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Signup:", data);
    alert(`Signup successful for ${data.name}`);
  };

  return (
    <div className="rounded-2xl bg-top-center mx-auto bg-black flex items-center justify-center p-4" style={{
      width: 375,
      height: 800,
      backgroundImage: 'url(images/photo.png)',
      backgroundRepeat: 'no-repeat'
    }}>
      <div>
          <h2 className="text-4xl font-semibold mb-4 text-slate-200">Sign up</h2>
       <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 w-full max-w-sm">
       
        <p className="mb-4 text-sm  text-white">Let’s create a new account for <strong>jane.doe@gmail.com</strong></p>
        <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full p-2 rounded bg-white border border-green-500 focus:outline-none"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          </div>
          <div className="relative">
            <input
              {...register("password")}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="w-full p-2 rounded bg-white border border-green-500 focus:outline-none pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 text-xs select-none"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ?  <Eye size={16} />: <EyeOff size={16} />}
            </button>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>
          <p className="text-sm text-gray-400">
            By selecting Agree and continue below, I agree to <span className="text-green-400 underline">Terms of Service</span> and <span className="text-green-400 underline">Privacy Policy</span>
          </p>
          <button
            type="submit"
            className="w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-semibold"
          >
            Agree and continue
          </button>
        </form>
    </div>
      </div>
      
     
    </div>
  )
}

export default Form01SignUp