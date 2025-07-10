import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
  name: string;
  age: number;
}

export default function ResettingForm() {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <input type="number" {...register('age')} />
      <button type="submit">Submit</button>
    </form>
  );
}
