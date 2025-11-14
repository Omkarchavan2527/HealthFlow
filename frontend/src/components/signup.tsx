
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
const SignupPage = () => {
  const Navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignupClick=()=>{
    console.log("hello from handl")
      Navigate('/login');
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login Submitted:", { username, email, password });
    const res = await api.post("/signup", { username, email, password });
    console.log(res);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      Navigate('/');

    } else {
      alert(res.data.msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-lg px-8 py-12">
        {/* Top blurred header */}
        <div className="absolute -top-14 left-0 w-full h-14 px-6 rounded-t-3xl bg-black backdrop-blur-md flex justify-between items-center text-black">
          <div className="font-semibold text-lg text-white" >Health Flow</div>
          <div className="flex items-center gap-3">
            <button onClick={handleSignupClick} className="border border-white text-white px-3 py-1 rounded-full text-sm">
              <span className="material-icons text-sm" ></span> Login
            </button>
          </div>
        </div>

        {/* Login Form */}
        <h2 className="text-3xl font-bold text-center mb-6 mt-2">SignUp</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />


          <div className="relative">



            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-gray-500 text-sm"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-full hover:bg-gray-900 transition duration-200"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
