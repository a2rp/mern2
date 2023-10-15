import React from 'react'
import styles from "./styles.module.scss";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const NavBar = () => {
    const navlinkStyles = ({ isActive }) => {
        return {
            color: isActive ? "green" : "#fff",
        }
    };

    const auth = useAuth();

    return (
        <nav className={styles.container}>
            <NavLink
                to="/home"
                className={styles.navlink}
                style={navlinkStyles}
            >Home</NavLink>
            <NavLink
                to="/dashboard"
                className={styles.navlink}
                style={navlinkStyles}
            >Dashboard</NavLink>
            <NavLink
                to="/register"
                className={styles.navlink}
                style={navlinkStyles}
            >Register</NavLink>
            {/* {!auth
                ? <> */}
            <NavLink
                to="/login"
                className={styles.navlink}
                style={navlinkStyles}
            >Login</NavLink>
            {/* </>
                : ""} */}
        </nav>
    )
}

export default NavBar
