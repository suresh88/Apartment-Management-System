// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// User interface
interface User {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

// AuthState interface
interface AuthState {
  currentUser: User | null;
  users: User[];
}

// Initial state
const initialState: AuthState = {
  currentUser: JSON.parse(sessionStorage.getItem("currentUser") || "null"),
  users: JSON.parse(sessionStorage.getItem("users") || "[]"),
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Initialize admin user if not exists
    initializeAdmin(state) {
      const adminExists = state.users.some(u => u.role === "admin");
      if (!adminExists) {
        const adminUser: User = {
          name: "Admin",
          email: "admin@example.com",
          password: "admin123",
          role: "admin",
        };
        state.users.push(adminUser);
        sessionStorage.setItem("users", JSON.stringify(state.users));
      }
    },

    // Login user
    login(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      sessionStorage.setItem("currentUser", JSON.stringify(action.payload));
    },

    // Logout user
    logout(state) {
      state.currentUser = null;
      sessionStorage.removeItem("currentUser");
    },

    // Signup new user
    signup(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      sessionStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

// Named exports for actions
export const { initializeAdmin, login, logout, signup } = authSlice.actions;

// Default export for reducer
export default authSlice.reducer;