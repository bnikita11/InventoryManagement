// src/components/Protected.jsx (or AuthLayout.jsx, but Protected is a more common name)
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status); // Get auth status from Redux
    const [loader, setLoader] = useState(true); // Manage loader state

    useEffect(() => {
        // console.log("Protected Route - authStatus:", authStatus, "authentication prop:", authentication);

        // Scenario 1: Route requires authentication (e.g., dashboard, inventory)
        // and user is NOT authenticated.
        if (authentication && authStatus !== authentication) {
            navigate("/login");
        }
        // Scenario 2: Route does NOT require authentication (e.g., login, signup)
        // and user IS authenticated.
        else if (!authentication && authStatus !== authentication) {
            navigate("/"); // Navigate to home or dashboard
        }
        setLoader(false); // Once checks are done, hide loader
    }, [authStatus, navigate, authentication]); // Dependencies

    // Show loader while the check is happening, then render children or redirect
    return loader ? <h1>Loading...</h1> : <>{children}</>;
}