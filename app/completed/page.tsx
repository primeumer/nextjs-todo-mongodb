"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

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
  async function loadTasks() {
    const response = await fetch("/api/tasks");
    const data = await response.json();
    const formattedTasks = data.map((task: any) => ({
      id: task._id,
      name: task.name,
      completed: task.completed,
    }));
    setTasks(formattedTasks);
  }
  const completedTasks = tasks.filter((task) => task.completed);
  return (
    <div className="container">
      <h1>Completed Tasks</h1>
      <ul>
        {completedTasks.length === 0 ? (
          <p className="empty-state">No completed tasks yet.</p>
        ) : (
          completedTasks.map((task) => (
            <li key={task.id} className="completed-item">
              <span>{task.name}</span>
              <Check size={18} className="check-icon" />
            </li>
          ))
        )}
      </ul>
      <Link href="/">
        <button className="back-btn">Back</button>
      </Link>
    </div>
  );
}
