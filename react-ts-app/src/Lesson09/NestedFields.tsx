import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
  user: IUser;
}

interface IUser {
  name: string;
  age: number;
}

export default function NestedFields() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('user.name')} />
      <input {...register('user.age')} />
      <button type="submit">Submit</button>
    </form>
  );
}
