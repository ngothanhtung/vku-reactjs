type Props = { message?: string };

export default function DefaultProps({ message = '' }: Props) {
  return <div>{message}</div>;
}
