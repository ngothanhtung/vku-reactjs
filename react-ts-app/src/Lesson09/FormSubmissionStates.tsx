import { useForm } from 'react-hook-form';

interface IFormInput {
  name: string;
}

export default function FormSubmissionStates() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IFormInput>();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name', { required: true, minLength: 3 })} />
      <button type="submit"> {isSubmitting ? 'Submitting...' : 'Submit'}</button>
    </form>
  );
}
