"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {toast} from "react-toastify"

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState ("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    
    async function handlelogin(){
        // setError("");
        if( !email || !password){
            toast.error("Please fill in all fields")
            return;
        }
        setLoading(true);
        const response = await fetch("/api/auth/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password}),      
        });
        const data = await response.json();
        setLoading(false);
        if (!response.ok){
            toast.error(data.error || "Something went wrong");
            return;
        }
        toast.success("Login Successful");
        router.push("/");
    }
    return(
        <div className="container">
      <h1>Login</h1>
      <div className="input-area" style={{ flexDirection: "column" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
        <button onClick={handlelogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
      <p style={{ textAlign: "center", color: "#eee" }}>
        Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
      </p>
    </div>
    )
}
