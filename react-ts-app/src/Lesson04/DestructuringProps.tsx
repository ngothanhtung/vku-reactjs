type Props = {
  name: string;
  age: number;
};

export default function DestructuringProps({ name, age }: Props) {
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}
