import React from 'react'
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="footer">
            <footer className="py-3 my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">

                    <div className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Features</Link></div>
                    <div className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Home</Link></div><div className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">Pricing</Link></div>
                    <div className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">FAQs</Link></div>
                    <div className="nav-item"><Link to="/" className="nav-link px-2 text-body-secondary">About</Link></div>
                </ul>
                <p className="text-center text-body-secondary">© 2024 Company, Inc</p>
            </footer>
        </div>
    )
}
