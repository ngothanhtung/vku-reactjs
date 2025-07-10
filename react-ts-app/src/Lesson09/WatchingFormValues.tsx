import { useForm } from 'react-hook-form';

interface IFormInput {
  name: string;
}

export default function WatchingFormValues() {
  const { register, watch } = useForm<IFormInput>();
  const name = watch('name');
  return (
    <div>
      <input {...register('name')} />
      <p>Current Value: {name}</p>
    </div>
  );
}
