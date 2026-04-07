// authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; 

interface User {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
}

interface AuthState {
  currentUser: User | null;
  users: User[];
}

const initialState: AuthState = {
  currentUser: JSON.parse(sessionStorage.getItem("currentUser") || "null"),
  users: JSON.parse(sessionStorage.getItem("users") || "[]"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
    login(state, action: PayloadAction<User>) {
      state.currentUser = action.payload;
      sessionStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout(state) {
      state.currentUser = null;
      sessionStorage.removeItem("currentUser");
    },
    signup(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
      sessionStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const { initializeAdmin, login, logout, signup } = authSlice.actions;
export default authSlice.reducer;