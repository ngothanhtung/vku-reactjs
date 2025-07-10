import { useForm, type SubmitHandler } from 'react-hook-form';
interface IFormInput {
  name: string;
}
export default function PersistingFormData() {
  const storedFormData = localStorage.getItem('formData');
  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: storedFormData ? JSON.parse(storedFormData) : {},
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    localStorage.setItem('formData', JSON.stringify(data));
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <button type="submit">Submit</button>
    </form>
  );
}
