// import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./Layouts/MainLayout";
import AuthLayout from "./Layouts/AuthLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PostList from "./pages/Posts/PostList";
import CreatePost from "./pages/Posts/CreatePost";
import EditPost from "./pages/Posts/EditPost";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import "./App.css";
import PostDetail from "./pages/Posts/PostDetail";
import OthersProfile from "./pages/OthersProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        {/* Main routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:user_id" element={<OthersProfile />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
