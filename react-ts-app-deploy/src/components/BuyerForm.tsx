import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCartContext } from '../context/CartContext';

interface BuyerFormData {
  name: string;
  email: string;
  address: string;
}

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Minimum 2 characters'),
  email: yup.string().required('Email is required').email('Invalid email'),
  address: yup.string().required('Address is required').min(5, 'Minimum 5 characters'),
}).required();

export default function BuyerForm() {
  const { cart } = useCartContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BuyerFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: BuyerFormData) => {
    console.log({
      ...data,
      cart: cart || null
    });
    reset();
    alert('Submit thành công:' + data.name)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Buyer Information</h2>

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
        <label className="block mb-1">Address</label>
        <input {...register('address')} className="border p-2 w-full rounded" />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
    </form>
  );
}
