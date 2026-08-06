"use client";
import { useState, useEffect } from "react";
import { Trash2, Check, RotateCcw } from "lucide-react";
import Link from "next/link";
import {toast} from "react-toastify";
import { useRouter } from "next/navigation";

type Task = {
  id: string;
  name: string;
  completed: boolean;
  dueDate?:string;
  priority?: "low" | "medium" | "high";
  category?: string ;
  tags?: string[];
};
function getDueStatus(dueDate?: string): string | null {
  if (!dueDate) return null;
  const now = new Date();
  const due = new Date(dueDate);
  const isSameDay =
    now.getFullYear() === due.getFullYear() &&
    now.getMonth() === due.getMonth() &&
    now.getDate() === due.getDate();
  if (due < now && !isSameDay) return "Overdue";
  if (isSameDay) return "Due Today";
  return null;
}
export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState (false);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("Work");
  const [tags, setTags] = useState("");
  const router = useRouter();
  useEffect(() => {
    loadTasks();
  },[]);
 async function loadTasks() {
  const response = await fetch("/api/tasks");
  if(!response.ok){
    if (response.status === 401){
      router.push("/login");
    }
    return;
  }
  const data = await response.json();
  const formattedTasks = data.map((task: any) => ({ 
    id: task._id,
    name: task.name,
    completed: task.completed,
    dueDate: task.dueDate,
    priority: task.priority,
    category: task.category,
    tags: task.tags,
  }));
  setTasks(formattedTasks);
}
  async function refineTask(action: string){
    if(task.trim() ===""){
      toast.error("Please enter your Task");
      return;
    }
    setRefining(true);
    const response = await fetch ("/api/ai/refine",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({text:task, action}),
    });
    const data = await response.json();
    setRefining(false);
    if (!response.ok){
      toast.error(data.error || "Something went wrong");
      return;
    }
    setTask(data.refinedText);
  }
  async function addTask() {
    if (task.trim() === "") {
      toast.error("Please Enter your Task");
      return;
    }
    setLoading(true);
    const tagsArray = tags
    .split(",")
    .map((t)=> t.trim())
    .filter((t)=> t !=="");
    const response = await fetch("/api/tasks" ,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task,
        completed: false,
        dueDate: dueDate || null,
        priority,
        category,
        tags: tagsArray,
      }),
    });
    console.log(response.status);
    await loadTasks();
    toast.success("Task added successfully");
    setTask("");
    setDueDate("");
    setPriority("medium");
    setTags("");
    setCategory("Work")
    setLoading(false);
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
  toast.success("Task deleted successfully");
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
  toast.success(`Task marked as ${!completed ? "completed" : "incomplete"}`);
}
async function handleLogout() {
  await fetch("/api/auth/logout", { method: "POST" });
  router.push("/login");
}
  return (
    <>
<div className="orbs">
  <div className="orb orb1"></div>
  <div className="orb orb2"></div>
  <div className="orb orb3"></div>
</div>
    <div className="container">
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <h1>TODO LIST APP</h1>
  </div>
      <div className="input-area">
      <input
        type="text"
        placeholder="Enter your Task here..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask} disabled={loading}>
        {loading ? "Adding...": "Add Task"}
      </button>
      </div>
      <div className="task-details">
        <input type="datetime-local"value={dueDate}onChange={(e)=> setDueDate(e.target.value)} />
        <select value={priority} onChange={(e)=> setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select value={category} onChange={(e)=> setCategory(e.target.value)} >
          <option value="Work">Work</option>
          <option value="Study">Study</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Health">Health</option>
        </select>
        <input type="text" placeholder="Tags (comma seperated)" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div className="ai-actions">
        <button onClick={() => refineTask("format")} disabled = {refining}>Format</button>
        <button onClick={() => refineTask("casual")} disabled = {refining}>Casual</button>
        <button onClick={() => refineTask("summary")} disabled = {refining}>Summary</button>
        <button onClick={() => refineTask("enhance")} disabled = {refining}>Enhance</button>

      </div>
      <ul>
  {tasks.length === 0 ? (
    <p className="empty-state">No tasks yet. Add one above!</p>
  ) : (
    tasks.map((task) => (
      <li
        key={task.id}
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        <div className="task-main">
          <div className="task-top">
            <span className="task-name">{task.name}</span>
            {task.completed ? "✔" : ""}
          </div>
          <div className="task-meta">
            {task.priority && (
              <span className={`badge priority-${task.priority}`}>{task.priority}</span>
            )}
            {task.category && (
              <span className="badge category">{task.category}</span>
            )}
            {task.dueDate && (
              <span className="badge due-date">
                {new Date(task.dueDate).toLocaleString()}
              </span>
            )}
            {getDueStatus(task.dueDate) &&(
              <span className={`badge status-${getDueStatus(task.dueDate)
                ?.replace("","-")
                .toLowerCase()}`}
                >
                  {getDueStatus(task.dueDate)}
                </span>
            )}
            {task.tags && task.tags.length > 0 && (
                      <span className="tags">
                        {task.tags.map((tag, i) => (
                          <span key={i} className="tag">
                            #{tag}
                          </span>
                        ))}
                      </span>
                    )}
          </div>
        </div>
      
        <div className="buttons">
          <button onClick={() => deleteTask(task.id)}>
            <Trash2 size={16} />
          </button>
          <button onClick={() => completeTask(task.id, task.completed)}>
            {task.completed ? <RotateCcw size={16} /> : <Check size={16} />}
          </button>
        </div>
      </li>
    ))
  )}
</ul>
<div className="bottom">
      <Link href="/completed">
  <button>View Completed Tasks</button>
</Link>
<button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
    </div>
    </>
  );
}
