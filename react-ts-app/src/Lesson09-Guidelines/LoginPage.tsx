// src/pages/Login.tsx

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Strong typed interface for form data
interface IFormInput {
  email: string;
  password: string;
}

// Yup validation schema with strong typing
const validationSchema: yup.ObjectSchema<IFormInput> = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange', // Validate on change for better UX
    defaultValues: {
      email: 'peter@example.com',
      password: 'Abc@123', // Example default value
    },
  });

  const onSubmit = async (data: IFormInput): Promise<void> => {
    try {
      console.log('Form data:', data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.email && dirtyFields.email
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.password
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.password && dirtyFields.password
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`w-full py-2 rounded-md font-medium transition-colors ${
            isSubmitting || !isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        {/* Form validation status indicator */}
        <div className="mt-4 text-center">
          <p className={`text-xs ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? 'Form is valid ✓' : 'Please fill in all required fields correctly'}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
