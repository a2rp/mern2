import { useState } from 'react';
import Swal from "sweetalert2";

const AddUser = ({ onSave, hideAddUserForm }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        if (!name || !mobile || !email) {
            return Swal.fire({
                icon: 'error',
                title: 'All fields required'
            })
        }

        onSave({
            name,
            mobile,
            email
        });

        setName('');
        setMobile('');
        setEmail('');
    }

    return (
        <form onSubmit={onSubmit} style={{ padding: "15px" }}>
            <input
                style={{
                    display: "block",
                    width: "100%",
                    paddingLeft: "15px",
                    height: "30px",
                }}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)} />

            <input
                style={{
                    display: "block",
                    width: "100%",
                    paddingLeft: "15px",
                    height: "30px",
                    marginTop: "5px"
                }}
                type="text"
                placeholder="Mobile"
                value={mobile}
                onChange={(event) => setMobile(event.target.value)} />

            <input
                style={{
                    display: "block",
                    width: "100%",
                    paddingLeft: "15px",
                    height: "30px",
                    marginTop: "5px"
                }}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)} />

            <input
                style={{
                    display: "inline-block",
                    width: "48%",
                    paddingLeft: "15px",
                    height: "30px",
                    marginTop: "5px",
                    border: "none",
                    backgroundColor: "green",
                    color: "#fff"
                }}
                type="submit"
                value="Save" />

            <input
                style={{
                    display: "inline-block",
                    float: "right",
                    width: "48%",
                    paddingLeft: "15px",
                    height: "30px",
                    marginTop: "5px",
                    border: "none",
                    backgroundColor: "orangered",
                    color: "#fff"
                }}
                type="button"
                value="Cancel"
                onClick={hideAddUserForm} />
        </form>
    )
}

export default AddUser