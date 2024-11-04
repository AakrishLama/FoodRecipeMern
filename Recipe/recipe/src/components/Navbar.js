import React from 'react';
import { Link ,  useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()

    const handleLogOut = ()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("admin");
        navigate("/Login")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand active fs-0.5 " to="/">COOK</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>
                            {localStorage.getItem("authToken") ?
                                <li className="nav-item">
                                    <Link className="nav-link fs-5 " to="/createFood" >Add Food</Link>
                                </li>
                                : ""}
                        </ul>
                        {!localStorage.getItem("authToken") ?
                            <div className="d-flex">
                                <Link className="btn bg-white text-success nav-link me-1" to="/Login">Log in</Link>
                                <Link className=" btn bg-white text-success nav-link me-1" to="/Signup">Sign up</Link>
                            </div>
                            :
                            <div className=" btn bg-white text-danger nav-link me-1" onClick={handleLogOut}>
                                Logout
                            </div>
                        }
                    </div>

                </div>
            </nav>
        </div>
    );
}
