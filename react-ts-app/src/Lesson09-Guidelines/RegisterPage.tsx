// src/pages/RegisterPage.tsx

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Strong typed interface for form data
interface IFormInput {
  email: string;
  password: string;
  retypePassword: string;
  fullName: string;
  phone: string;
  address: string;
  gender: 'male' | 'female' | 'other';
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
  retypePassword: yup
    .string()
    .required('Please retype your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 characters'),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(200, 'Address must be less than 200 characters'),
  gender: yup
    .mixed<'male' | 'female' | 'other'>()
    .required('Please select your gender')
    .oneOf(['male', 'female', 'other'], 'Please select a valid gender'),
});

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange', // Validate on change for better UX
    defaultValues: {
      email: '',
      password: '',
      retypePassword: '',
      fullName: '',
      phone: '',
      address: '',
      gender: 'male',
    },
  });

  const onSubmit = async (data: IFormInput): Promise<void> => {
    try {
      console.log('Registration data:', data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Registration successful!');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

        {/* Full Name Field */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-bold text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            {...register('fullName')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.fullName
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.fullName && dirtyFields.fullName
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold text-gray-700">
            Email <span className="text-red-500">*</span>
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

        {/* Phone Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-bold text-gray-700">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.phone
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.phone && dirtyFields.phone
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter your phone number"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        {/* Address Field */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-bold text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <textarea
            id="address"
            {...register('address')}
            rows={3}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors resize-none ${
              errors.address
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.address && dirtyFields.address
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter your address"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
        </div>

        {/* Gender Field */}
        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-bold text-gray-700">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            id="gender"
            {...register('gender')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.gender
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.gender && dirtyFields.gender
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-bold text-gray-700">
            Password <span className="text-red-500">*</span>
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

        {/* Retype Password Field */}
        <div className="mb-6">
          <label htmlFor="retypePassword" className="block text-sm font-bold text-gray-700">
            Retype Password <span className="text-red-500">*</span>
          </label>
          <input
            id="retypePassword"
            type="password"
            {...register('retypePassword')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.retypePassword
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.retypePassword && dirtyFields.retypePassword
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Retype your password"
          />
          {errors.retypePassword && <p className="text-red-500 text-xs mt-1">{errors.retypePassword.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`w-full py-2 rounded-md font-medium transition-colors ${
            isSubmitting || !isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isSubmitting ? 'Registering...' : 'Register'}
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

export default RegisterPage;
