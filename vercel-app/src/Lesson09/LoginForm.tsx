import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Handle form submission logic here
    console.log(data);
    // Todo: Call api
    // Code here ...
  };

  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      {/* Create a login form using React + Tailwindcss (email, password, and submit button),
      include labels for each input field.
      Use Tailwindcss classes to style the form, inputs, and button.
      Ensure the form is responsive and looks good on both desktop and mobile devices.
      . */}
      <form style={{ width: 400 }} className='max-w-md mx-auto p-4 bg-white rounded-lg shadow-md' onSubmit={handleSubmit(onSubmit)}>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
            Email
          </label>
          <input {...register('email')} type='email' id='email' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your email' required />
        </div>
        <div className='mb-6'>
          <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-1'>
            Password
          </label>
          <input {...register('password')} type='password' id='password' className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your password' required />
        </div>
        <button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200'>
          Submit
        </button>
      </form>
    </div>
  );
}
