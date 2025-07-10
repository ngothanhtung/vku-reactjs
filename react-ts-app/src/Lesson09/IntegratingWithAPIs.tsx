import { useForm, type SubmitHandler } from 'react-hook-form';

interface IFormInput {
  name: string;
}

export default function IntegratingWithAPIs() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const res = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log(await res.json());
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <button type="submit">Submit</button>
    </form>
  );
}
