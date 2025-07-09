import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Customer } from './types';

type Props = {
  onCreated?: (customer: Customer) => void; // Optional callback when a customer is created
};

// Yup validation schema
const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number'),
  address: yup.string().required('Address is required').min(10, 'Address must be at least 10 characters'),
  birthday: yup
    .string()
    .required('Birthday is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
});

const url = 'https://server.aptech.io/online-shop/customers';

export default function Create({ onCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Customer>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
      birthday: '',
    },
  });

  const onSubmit = async (data: Customer) => {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Customer created successfully:', result);

      // Reset form after successful creation
      reset();

      alert('Customer created successfully!');

      if (onCreated && typeof onCreated === 'function') {
        onCreated(result);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      alert('Error creating customer. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-xl font-bold mb-4">Create Customer</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            {...register('firstName')}
            className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            {...register('lastName')}
            className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            {...register('phoneNumber')}
            className={`w-full p-2 border rounded ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            {...register('address')}
            className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="birthday">
            Birthday
          </label>
          <input
            type="date"
            id="birthday"
            {...register('birthday')}
            className={`w-full p-2 border rounded ${errors.birthday ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.birthday && <p className="text-red-500 text-sm mt-1">{errors.birthday.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded transition-colors ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isSubmitting ? 'Creating...' : 'Create Customer'}
        </button>
      </form>
    </div>
  );
}
