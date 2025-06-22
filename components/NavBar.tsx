import Image from "next/image";
import Link from "next/link";
import React from "react";

function NavBar() {
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom">
        <div className="container">
          <Link className="navbar-brand" href="/">
            <Image
              src="/img/clearcut_logo.png"
              alt="ClearCutToday Logo"
              width={150}
              height={40}
              className=""
            />
          </Link>
          <button
            className="navbar-toggler border-0 d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#features">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#benefits">
                  Benefits
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item d-none">
                <a
                  className="nav-link btn btn-outline-primary"
                  href="#benefits"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
