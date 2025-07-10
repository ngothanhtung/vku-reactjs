import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
  hasPet?: boolean;
  petName?: string;
}

export default function FormWithConditionalFields() {
  const { register, handleSubmit, watch } = useForm<IFormInput>();
  const hasPet = watch('hasPet');
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="checkbox" {...register('hasPet')} />
      {hasPet && <input {...register('petName')} />}
      <button type="submit">Submit</button>
    </form>
  );
}
