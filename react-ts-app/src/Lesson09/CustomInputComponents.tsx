import { useForm } from 'react-hook-form';

function CustomInput({ register, name, ...props }) {
  return <input {...register(name)} {...props} />;
}

export default function CustomInputComponents() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput register={register} name="name" placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  );
}
