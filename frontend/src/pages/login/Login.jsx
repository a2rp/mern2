import React, { useEffect, useState } from 'react'
import styles from "./styles.module.scss";
import { useAuth } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";

import useNetwork from '../../hooks/useNetwork';

const Login = () => {
    const networkState = useNetwork();
    const {
        online
    } = networkState;

    const navigate = useNavigate();
    const auth = useAuth();

    const [user, setUser] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (event) => {
        // console.log(user, "user");
        const options = {
            url: 'http://localhost:1198/api/v1/admin/login',
            method: 'POST',
            withCredentials: true,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                email: user.email,
                password: user.password
            }
        };
        if (!online) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "NOT CONNECTED TO INTERNET. Enable WI-FI / Mobile Data.",
            });
        }

        try {
            setIsLoading(true);
            const response = await axios.request(options);
            // console.log(response);
            if (!response.data.success) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.data.message,
                });
            }

            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: response.data.message,
            });

            auth.login(response.data.email);
            window.localStorage.setItem("admin", response.data.email);
            navigate("/dashboard", { replace: true });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const [admins, setAdmins] = useState(null);
    useEffect(() => {
        const getAll = async () => {
            const response = await axios.get("http://localhost:1198/api/v1/admin");
            const admins = response.data.message;

            if (!response.data.success) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error fetching admins',
                    text: response.data.message,
                });
            } else {
                console.log(response.data.message);
                setAdmins(response.data.message);
            }
        };
        getAll();
    }, [])


    return (
        <div className={styles.container}>
            <div className={styles.heading}>Login</div>

            <input
                type="email"
                placeholder="Email Address"
                name="email"
                id="email"
                value={user.email}
                onChange={(event) => setUser({ ...user, email: event.target.value })} />

            <input
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={user.password}
                onChange={(event) => setUser({ ...user, password: event.target.value })} />

            <input
                type="button"
                className={styles.button}
                value="Login"
                onClick={handleLogin}
                disabled={isLoading} />

            <h3 className={styles.heading}>List of all admins</h3>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>username</th>
                        <th>email</th>
                        <th>created_at</th>
                    </tr>
                </thead>
                <tbody>
                    {admins && admins.map((admin) => (
                        <tr key={admin._id}>
                            <td>{admin.username}</td>
                            <td>{admin.email}</td>
                            <td>{new Date(admin.createdAt).toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Login
