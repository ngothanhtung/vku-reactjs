import { useForm } from 'react-hook-form';

export default function HandlingFileInputs() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data.file[0].name);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="file" {...register('file')} />
      <button type="submit">Submit</button>
    </form>
  );
}
