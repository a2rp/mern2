import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./styles.module.scss";

import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import NoMatchRoute from "./pages/noMatchRoute";

import NavBar from "./components/navbar";

import { AuthProvider } from "./utils/auth";
import RequireAuth from "./utils/RequireAuth";
import HasAuth from "./utils/HasAuth";

function App() {
    return (
        <div className={styles.container}>
            <AuthProvider>
                <NavBar />
                <div className={styles.routesContainer}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/home" />} />
                        <Route
                            path="/home"
                            element={<Home />} />
                        <Route
                            path="/dashboard"
                            element={<RequireAuth> <Dashboard /> </RequireAuth>} />
                        <Route
                            path="/login"
                            element={<HasAuth> <Login /> </HasAuth>} />
                        <Route
                            path="/register"
                            element={<Register />} />
                        <Route
                            path="*"
                            element={<NoMatchRoute />} />
                    </Routes>
                </div>
            </AuthProvider>
        </div>
    );
}

export default App;
