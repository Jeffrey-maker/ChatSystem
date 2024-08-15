import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Forum from './pages/Forum';
import CourseRoom from './pages/CourseRoom';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat'
// import Dashboard from './pages/Dashboard'; // Assume this is your dashboard component
import { getCurrentUser } from './services/authService'; // Import the auth service

const Layout = () => {
    return (
        <>
            <Navbar />
            <div
                style={{
                    display: "flex",
                    height: "100%",
                    minHeight: "100vh",
                    marginTop: "80px",
                }}
            >
                <Sidebar />
                <div style={{ flex: 1, overflow: "auto" }}>
                    <Outlet />
                </div>
            </div>
        </>
    );
};


const router = createBrowserRouter([
    {
        path: "/app",
        element: <Layout />,
        children: [
            {
                path: "/app/forum",
                element: <Forum />,
            },
            {
                path: "/app/courseroom",
                element: <CourseRoom />,
            },
            {
                path: "/app/contact",
                element: <Contact />,
            },
            {
                path:"/app/chat",
                element:<Chat />,
            }
        ],
    },
    {
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
])

function App() {
    const [user, setUser] = useState(null);

    // Check if the user is logged in when the app mounts
    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    // A PrivateRoute component to protect routes
    const PrivateRoute = ({ element, ...rest }) => {
        return user ? element : <Navigate to="/login" />;
    };

    return <RouterProvider router={router} />;
}

export default App;
