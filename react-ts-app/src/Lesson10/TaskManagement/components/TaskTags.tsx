import type { Task } from '../types';

type Props = {
  tags?: Task['tags'];
};

export default function TaskTags({ tags }: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      {tags?.slice(0, 2).map((tag, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
        >
          {tag}
        </span>
      ))}
      {tags && tags.length > 2 && (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          +{tags.length - 2}
        </span>
      )}
    </div>
  );
}
