'use client'

import { useEffect, useState } from "react"

interface TasksData {
    id: string;
    title: string;
    description: string;
    status: string;
}

const TasksClient = () => {
   const [data, setData] = useState<TasksData[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await fetch('/api/tasks', {
        headers: {
        'Authorization': `Bearer xxxxx`,
        },
    })
                if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu task')
                const task = await res.json()
                setData(task.data)
            } catch (err) {
                setError(err.message || 'Lỗi không xác định')
            } finally {
                setLoading(false)
            }
        }
        fetchTask()
    }, [])

    if (loading) return <div>Đang tải...</div>
    if (error) return <div className="text-red-500">{error}</div>
    if (!data) return <div>Không có dữ liệu</div>
  return (
    <div>
         <ul className="task-list">
            {
                data.map((task: any) => (
                    <li key={task.id} className="task-item">
                        <h2>{task.title}</h2>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default TasksClient


