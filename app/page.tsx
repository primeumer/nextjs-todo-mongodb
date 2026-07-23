"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import "./page.css";

type Task = {
  id: string;
  name: string;
  completed: boolean;
};
export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => {
    loadTasks();
  },[]);
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
  async function addTask() {
    if (task.trim() === "") {
      alert("Please Enter your Task");
      return;
    }
    const response = await fetch("/api/tasks" ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task,
        completed: false,
      }),
    });
    console.log(response.status);
    await loadTasks();
    setTask("");
  }
 async function deleteTask(id: string){
  await fetch("/api/tasks",{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });
  await loadTasks();
 }
async function completeTask(id: string, completed: boolean) {
  await fetch("/api/tasks", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      completed: !completed,
    }),
  });
  await loadTasks();
}
  return (
    <div className="container">
      <h1>TODO LIST APP</h1>
      <div className="input-area">
      <input
        type="text"
        placeholder="Enter your Task here..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
            }}
          >
            {task.name}{task.completed ? "✔" : ""}
            <div className="buttons">
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => completeTask(task.id, task.completed)}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/completed">
  <button>View Completed Tasks</button>
</Link>
    </div>
  );
}
