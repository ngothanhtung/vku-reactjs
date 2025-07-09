import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const signupSchema = yup.object({
  name: yup.string().required("Name is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

type FormData = yup.InferType<typeof signupSchema>;

const Form01SignUp = () => {

  
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Signup:", data);
  };

  return (
    <div className="rounded-2xl bg-cover bg-center relative mx-auto bg-black flex items-center justify-center p-4" style={{
      width: 375,
      height: 600,
      backgroundImage: 'url(images/photo.png)',
      backgroundRepeat: 'no-repeat'
    }}>
       <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center">
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 w-full max-w-sm text-white">
       <h2 className="text-2xl font-semibold mb-4">Sign up</h2>
        <p className="mb-4 text-sm">Let’s create a new account for <strong>jane.doe@gmail.com</strong></p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full p-2 rounded bg-white text-white border border-green-500 focus:outline-none"
            />
            {errors.name && <p className="text-red-400 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              className="w-full p-2 rounded bg-white text-white border border-green-500 focus:outline-none"
            />
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>
          <p className="text-sm text-gray-400">
            By selecting Agree and continue below, I agree to <span className="text-green-400 underline">Terms of Service</span> and <span className="text-green-400 underline">Privacy Policy</span>
          </p>
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded font-semibold"
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