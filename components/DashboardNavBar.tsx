import Image from "next/image";
import React from "react";
import { FaBell } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";

function DashboardNavBar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-white border-bottom">
      <div className="container">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <button
              className="btn border-0 d-lg-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#Id2"
              aria-controls="Id2"
            >
              <FiMenu size={20} />
            </button>
            <Image
              src="/img/clearcut_logo.png"
              alt="ClearCutToday Logo"
              width={150}
              height={40}
              className=""
            />
          </li>
        </ul>
        <ul className="nav navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link active" href="#" aria-current="page">
              <FaBell /> <span className="visually-hidden">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span className="avatar rounded-circle p-2 bg-primary bg-opacity-10">
                SJ
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default DashboardNavBar;
