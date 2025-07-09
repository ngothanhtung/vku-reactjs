type Props = {
  task: {
    title: string;
    description?: string;
  };
};

export default function TaskTitle({ task }: Props) {
  return (
    <div className="flex flex-col">
      <div className="text-sm font-medium font-bold text-gray-900">{task.title}</div>
      {task.description && <div className="text-sm text-gray-500 mt-1 max-w-xs truncate">{task.description}</div>}
    </div>
  );
}
