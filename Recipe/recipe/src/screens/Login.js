import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'

export default function Login() {
    const navigate = useNavigate()
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:9000/api/loginUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json)
        if (!json.success) {
            alert("Enter valid credentials")
        } else {
            navigate("/");
            localStorage.setItem("authToken", json.authToken);
            console.log("local", localStorage.getItem("authToken"))
            localStorage.setItem("admin", json.admin)
            console.log("admin: ", localStorage.getItem("admin"))
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Navbar />
            <div className='container mt-4' style={{ backgroundColor: 'black' }}>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/Signup" className="m-3 btn btn-danger"> Sign Up</Link>
                </form>
            </div>
        </>
    )
}
