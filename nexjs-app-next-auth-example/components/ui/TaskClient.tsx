'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface TasksData {
  id: string;
  title: string;
  description: string;
  status: string;
}

const TasksClient = () => {
  //Lấy session từ client component
  const { data: session } = useSession();

  console.log('<<=== 🚀 TasksClient session ===>>', session);

  const [data, setData] = useState<TasksData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        /**
         * Có thể sử dụng access token từ session để gọi Backend API.
         * Ví dụ: const token = session?.user.accessToken;
         * const res = await fetch('https://server.aptech.io/workspaces/tasks', {
            headers: {
                Authorization: `Bearer session?.user.accessToken`,
            },
            });

         * Tuy nhiên cách này làm lộ access token trong trình duyệt.
         * Nên sử dụng server-side rendering hoặc API route để bảo mật hơn.
         */
        const res = await fetch('/api/tasks'); 
        /**
         * Gọi trung gian qua Router Handler ==> app\api\tasks\route.ts
         * Router Hanlder lấy token từ session sau đó gọi đến Backend API
         */
        if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu task');
        const task = await res.json();
        setData(task.data);
      } catch (err) {
        setError(err.message || 'Lỗi không xác định');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>Không có dữ liệu</div>;
  return (
    <div>
      <ul className="task-list">
        {data.map((task: any) => (
          <li key={task.id} className="task-item">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksClient;
