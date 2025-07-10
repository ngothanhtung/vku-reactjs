import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
  name: string;
  age: number;
}

export default function DefaultValues() {
  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: { name: 'John Doe', age: 25 },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <input type="number" {...register('age')} />
      <button type="submit">Submit</button>
    </form>
  );
}
