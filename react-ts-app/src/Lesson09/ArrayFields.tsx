import { useFieldArray, useForm } from 'react-hook-form';
interface Item {
  value: string;
}

interface FormValues {
  items: Item[];
}

export default function ArrayFields() {
  const { register, handleSubmit, control } = useForm<FormValues>();
  const { fields, append } = useFieldArray({ control, name: 'items' });

  const onSubmit = (data: FormValues) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field, index) => (
        <input key={field.id} {...register(`items.${index}.value`)} />
      ))}
      <button type="button" onClick={() => append({ value: '' })}>
        Add Item
      </button>
      <button type="submit">Submit</button>
    </form>
  );
}
