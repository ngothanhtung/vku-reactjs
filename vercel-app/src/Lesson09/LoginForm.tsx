import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface IFormInput {
  email: string;
  password: string;
  age: number;
}

// Validation schema using Yup
const schema = yup
  .object({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string().min(4, 'Mật khẩu phải có ít nhất 4 ký tự').required('Mật khẩu là bắt buộc'),
    age: yup
      .number()
      .integer('Tuổi phải là số nguyên') // Kiểm tra kiểu dữ liệu là số nguyên
      .min(18, 'Tuổi phải lớn hơn hoặc bằng 18') // Kiểm tra tuổi lớn hơn hoặc bằng 18
      .max(65, 'Tuổi phải nhỏ hơn hoặc bằng 65') // Kiểm tra tuổi nhỏ hơn hoặc bằng 65
      .required('Tuổi là bắt buộc'), // Trường này là bắt buộc
  })
  .required();

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Handle form submission logic here
    console.log(data);
    // Todo: Call api
    // Code here ...
  };

  console.log('errors', errors);
  return (
    <div className='container mx-auto p-4'>
      {/* Create a login form using React + Tailwindcss (email, password, and submit button),
      include labels for each input field.
      Use Tailwindcss classes to style the form, inputs, and button.
      Ensure the form is responsive and looks good on both desktop and mobile devices.
      . */}
      <form className='max-w-md mx-auto p-4 bg-white rounded-lg shadow-md' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 font-bold text-left mb-1'>
            Email (*)
          </label>
          <input {...register('email')} type='text' id='email' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your email' />
          {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700 font-bold text-left mb-1'>
            Password (*)
          </label>
          <input {...register('password')} type='password' id='password' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your password' />
          {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
        </div>
        <div className='mb-6'>
          <label htmlFor='age' className='block text-sm font-medium text-gray-700 font-bold text-left mb-1'>
            Age (*)
          </label>
          <input {...register('age', { valueAsNumber: true })} type='number' id='age' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your age' />
          {errors.age && <span className='text-red-500'>{errors.age.message}</span>}
        </div>
        {/* Submit button */}
        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200'>
          Submit
        </button>
      </form>
    </div>
  );
}
