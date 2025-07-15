// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthService from './appwrite/auth'; // Corrected path
import { login as authLogin, logout as authLogout } from './store/authSlice';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MainLayout from './components/MainLayout'; // Assuming this exists and has an <Outlet />
import InventoryListPage from './pages/InventoryList';
import DashboardPage from './pages/Dashboard';
import Protected from './components/AuthLayout'; // Import the renamed Protected component

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // This useEffect runs once when the app mounts to check initial auth status
    useEffect(() => {
        AuthService.getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(authLogin(userData)); // User is logged in
                } else {
                    dispatch(authLogout()); // No user session
                }
            })
            .catch((error) => {
                console.error("Failed to check current user on app load:", error);
                dispatch(authLogout()); // Ensure logout on error as well
            })
            .finally(() => {
                setLoading(false); // Loading is complete
            });
    }, [dispatch]); // Dependency array: only run once on mount

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1>Loading application...</h1>
            </div>
        );
    }

    return (
        <Routes>
            {/* Public Routes - accessible to everyone, but redirect if logged in */}
            <Route path="/login" element={
                <Protected authentication={false}> {/* Guest only route */}
                    <Login />
                </Protected>
            } />
            <Route path="/sign-up" element={
                <Protected authentication={false}> {/* Guest only route */}
                    <Signup />
                </Protected>
            } />

            {/* Protected Routes - only accessible if logged in */}
            {/* The MainLayout will contain an <Outlet /> for its nested routes */}
            <Route path="/" element={
                <Protected authentication={true}> {/* Requires authentication */}
                    <MainLayout />
                </Protected>
            }>
                {/* Nested routes within MainLayout */}
                <Route index element={<DashboardPage />} /> {/* Default route for / */}
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="inventory" element={<InventoryListPage />} />
                {/* Add other protected routes here */}
            </Route>

            {/* Catch-all route for unmatched paths */}
            {/* We don't need to check isLoggedIn here anymore, Protected will handle it.
                If someone tries to access a non-existent path, they will be redirected to
                either /login or / based on their auth status (handled by Protected).
            */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;