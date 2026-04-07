import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, signup, initializeAdmin } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux store users
  const users = useSelector((state: any) => state.auth.users);

  const [showSignup, setShowSignup] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    dispatch(initializeAdmin()); // Admin auto-create
  }, [dispatch]);

  // Login function
  const handleLogin = (e: any) => {
    e.preventDefault();

    const foundUser = users.find(
      (u: any) => u.email === loginData.email && u.password === loginData.password
    );

    if (foundUser) {
      dispatch(login(foundUser)); // Store in Redux + sessionStorage
      alert(`Welcome ${foundUser.name}!`);
      navigate(foundUser.role === "admin" ? "/admin" : "/user");
    } else {
      alert("Invalid email or password!");
    }
  };

  // Signup function
  const handleSignup = (e: any) => {
    e.preventDefault();

    const emailExists = users.some((u: any) => u.email === signupData.email);
    if (emailExists) return alert("Email already registered!");

    const newUser = { ...signupData, role: "user" };
    dispatch(signup(newUser)); // Redux + sessionStorage update

    alert("Account created successfully!");
    setShowSignup(false);
    setSignupData({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Login Box */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className="border p-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="border p-2 rounded"
            required
          />

          <button className="bg-blue-600 text-white p-2 rounded">Login</button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <span className="text-blue-600 cursor-pointer" onClick={() => setShowSignup(true)}>
            Create New
          </span>
        </p>
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 w-full max-w-md rounded shadow">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>

            <form onSubmit={handleSignup} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                className="border p-2 rounded"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                className="border p-2 rounded"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={signupData.password}
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                className="border p-2 rounded"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => setShowSignup(false)}
                >
                  Cancel
                </button>

                <button className="bg-blue-600 text-white px-4 py-1 rounded">
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