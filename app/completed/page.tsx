"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
type Task = {
  id: string;
  name: string;
  completed: boolean;
};
export default function CompletedPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
   loadTasks();
  }, []);
  async function loadTasks(){
    const response = await fetch("/api/tasks");
    const data = await response.json();
    const formattedTasks = data.map((task:any) => ({
      id: task._id,
      name: task.name,
      completed: task.completed,
    }));
    setTasks(formattedTasks)
  }
  const completedTasks = tasks.filter((task) => task.completed);
  return (
    <div>
      <h1>Completed Tasks</h1>
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            {task.name} ✔
          </li>
        ))}
      </ul>
      <Link href="/">
        <button>Back</button>
      </Link>
    </div>
  );
}