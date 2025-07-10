import { Controller, useForm } from 'react-hook-form';
import { Select } from 'antd';

export default function FormContextWithController() {
  const { control, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="color"
        control={control}
        render={({ field }) => {
          return <Select options={[{ value: 'red', label: 'Red' }]} {...field} />;
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
