import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserContext } from '../hooks/useUserContext';


interface FormData {
  name: string;
  email: string;
  age: number | null;
}

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Minimum 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .integer()
    .nullable()
    .optional()
    .default(null)
    .transform((value, originalValue) => (originalValue === '' ? null : value)),
}).required();

export default function UserForm() {
  const { addUser } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    addUser(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Add User</h2>

      <div>
        <label className="block mb-1">Name</label>
        <input {...register('name')} className="border p-2 w-full rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Email</label>
        <input {...register('email')} className="border p-2 w-full rounded" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block mb-1">Age (optional)</label>
        <input type="number" {...register('age')} className="border p-2 w-full rounded" />
        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
    </form>
  );
}