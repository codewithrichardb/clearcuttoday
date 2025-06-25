import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Dropdown } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function NavBar() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
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
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/#features" className="nav-link">
                Features
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/#benefits" className="nav-link">
                Benefits
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/#about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
          
          <div className="d-flex align-items-center" ref={dropdownRef}>
            {currentUser ? (
              <Dropdown>
                <Dropdown.Toggle 
                  variant="link" 
                  id="dropdown-user"
                  className="text-decoration-none d-flex align-items-center p-0"
                >
                  <div className="d-flex align-items-center">
                    {currentUser.photoURL ? (
                      <Image
                        src={currentUser.photoURL}
                        alt="User profile"
                        width={32}
                        height={32}
                        className="rounded-circle me-2"
                      />
                    ) : (
                      <FaUserCircle className="fs-3 me-2" />
                    )}
                    <span className="d-none d-md-inline">
                      {currentUser.displayName || 'My Account'}
                    </span>
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end">
                  <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
                  <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex gap-2">
                <Link 
                  href="/login" 
                  className="btn border-0"
                >
                 Login
                </Link>
                <Link 
                  href="/signup" 
                  className="btn btn-primary text-white"
                >
                   Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
