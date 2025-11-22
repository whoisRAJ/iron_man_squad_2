"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
  e.preventDefault();

  setMessage("Checking...");
  
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Login Successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } else {
      setMessage(data.message);
    }
  } catch (error) {
    setMessage("Server error. Try again later.");
  }
};


  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex w-[1000px] justify-between items-center">
        
        {/* LEFT IMAGE */}
        <Image 
  src="/healthcare.png"
  alt="HEALTHCARE"
  width={600}   
  height={1000}  
  className="rounded-xl shadow-md object-cover"
/>

        {/* RIGHT LOGIN BOX */}
        <div className="flex flex-col gap-4">
          
          {/* MAIN BOX */}
          <div className="w-full max-w-sm bg-white p-8 border rounded-xl shadow-sm">
            <h1 className="text-4xl font-bold text-center mb-6 font-serif">
              HEALTHCARE
            </h1>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Phone number, username or email"
                className="border p-3 rounded-md text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                className="border p-3 rounded-md text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Log in
              </button>
            </form>

            {/* Message */}
            {message && (
              <p
                className={`mt-4 text-center ${
                  message.includes("Successful") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            {/* SIGN UP LINK */}
            <div className="text-center mt-4">
              <p className="text-sm">
                Don’t have an account?{" "}
                <span 
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </span>
              </p>
            </div>

            {/* FORGOT PASSWORD
            <p 
              className="text-center text-sm text-blue-600 mt-3 cursor-pointer hover:underline"
              onClick={() => router.push("/forgot-password")}
            >
              Forgotten your password?
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
