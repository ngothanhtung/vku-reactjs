type Props = {
  onClick: () => void;
};

export default function PropsAsFunction({ onClick }: Props) {
  return (
    <div>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}
