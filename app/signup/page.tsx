"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    async function handleSignup(){
        setError("");
        if(!email || !password){
            setError("Fill all fields");
            return;
        }
        setLoading(true);
        const response = await fetch ("/api/auth/signup",{
            method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({email, password}),
        });
        const data = await response.json();
        setLoading(false);
        if (!response.ok){
            setError(data.error || "Something went wrong");
            return;
        }
        router.push("/login");
    }
    return(
        <div className="container">
      <h1>Sign Up</h1>
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
          {error && <p style={{ color: "salmon" }}>{error}</p>}
        <button onClick={handleSignup} disabled={loading}>
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </div>
      <p style={{ textAlign: "center", color: "#eee" }}>
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
    )
}