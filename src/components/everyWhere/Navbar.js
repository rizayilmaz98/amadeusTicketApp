import React from 'react'
import { Link } from 'react-router-dom'
import "/node_modules/flag-icons/css/flag-icons.min.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top py-2">
        <div className="container px-0 px-lg-5">
            <Link className="navbar-brand logo-title fs-4 text-third ps-0 ps-lg-5" to="/">BILETALL.com</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end " id="navbarSupportedContent">
                <ul className="navbar-nav mb-2 mb-lg-0 gap-4">
                    <li className="nav-item">
                        <Link className="nav-link active fs-7" aria-current="page" to="/">Anasayfa</Link>
                    </li>
                    <li className="nav-item d-none d-lg-flex">
                        <span className="nav-link active fs-7" aria-current="page">|</span>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link active fs-7" aria-disabled="true">Biletlerim</Link>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar