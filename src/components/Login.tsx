import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/store";
import { API } from "../services/api";
import axios from "axios";
import type { FormEvent } from "react";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showSignup, setShowSignup] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", loginData);

      const user = res.data.data.user; 
      dispatch(login({
      name: user.name,
      email: user.email,
      role: user.role,
    }));
     
      alert(`Welcome ${user.name}`);
    
      navigate(user.role === "admin" ? "/admin" : "/");
    } 

catch (err: unknown) {
  if (axios.isAxiosError(err)) {
    alert(err.response?.data?.message || "Login failed");
  } else {
    alert("Login failed");
  }
}

  };

  // Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
    await API.post("/auth/register", signupData);

      alert("Account created!");

      setShowSignup(false);
      setSignupData({ name: "", email: "", password: "" });
    } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      alert(err.response?.data?.message || "Signup failed");
    } else {
      alert("Signup failed");
    }
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* LOGIN */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm md:max-w-md 
                      transition-all duration-300">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome to EasyHome</h1>
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-700">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button className="bg-blue-600 text-white p-3 rounded-lg 
                             hover:bg-blue-700 transition-all">Login</button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer font-semibold"
            onClick={() => setShowSignup(true)}
          >
            Create New
          </span>
        </p>
      </div>

      {/* Signup*/}
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">
          <div className="bg-white p-6 w-full max-w-md rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

            <form onSubmit={handleSignup} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <div className="flex justify-end gap-3 mt-3">
                <button
                  type="button"
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowSignup(false)}
                >
                  Cancel
                </button>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
