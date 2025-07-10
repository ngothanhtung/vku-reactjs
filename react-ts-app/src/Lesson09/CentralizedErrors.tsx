import { useForm } from 'react-hook-form';

export default function CentralizedErrors() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: 'Required' })} />
      {Object.keys(errors).length > 0 && <p>Form has errors, please check inputs</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
