import { useForm } from 'react-hook-form';

interface IFormInput {
  email: string;
}

export default function CustomValidation() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          validate: (value) => value.includes('@') || 'Invalid email',
        })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
