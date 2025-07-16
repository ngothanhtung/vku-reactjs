import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


const TaskServer = async () => {
     const session = await getServerSession(authOptions)
     if(!session || !session.user) {
        return (
            <div>
                <h1>You are not logged in</h1>
            </div>
        )
     }
     //Gọi API trong server component
    const response = await fetch('https://server.aptech.io/workspaces/tasks', {
        headers: {
        'Authorization': `Bearer ${session.user.accessToken}`,
        },
    });
    if (!response.ok) {
        return 'Error fetching profile data';
    }
    const tasks = await response.json();
    console.log('data tasks',tasks);

  return (
    <div>
        <h1>Profile</h1>
        <ul className="task-list">
            {
                tasks.map((task: any) => (
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

export default TaskServer