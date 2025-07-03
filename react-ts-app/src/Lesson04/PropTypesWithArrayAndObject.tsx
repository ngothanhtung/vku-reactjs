type Props = {
  items: string[];
  user: {
    id: number;
    name: string;
  };
};

export default function PropTypesWithArrayAndObject({ items, user }: Props) {
  return (
    <div>
      <h2>PropTypesWithArrayAndObject</h2>
      <div>
        <h3>User Information</h3>
        <p>ID: {user.id}</p>
        <p>Name: {user.name}</p>
      </div>
      <div>
        <h3>Items</h3>
        <ul>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
