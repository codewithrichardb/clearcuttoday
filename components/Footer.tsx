import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Image
              src="/img/clearcut_logo.png"
              alt="ClearCutToday Logo"
              width={150}
              height={40}
              className="mb-3"
            />
            <p>
              Your personal emotional clarity system — from heartache to
              self-empowerment.
            </p>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="fw-semibold">Features</h6>
            <ul className="list-unstyled">
              <li className="list-item">
                <Link href="/">Emotional Detox</Link>
              </li>
              <li className="list-item">
                <Link href="/">Smart Journaling</Link>
              </li>
              <li className="list-item">
                <Link href="/">Community Support</Link>
              </li>
              <li className="list-item">
                <Link href="/">Progress Tracking</Link>
              </li>
              <li className="list-item">
                <Link href="/">Guided Meditations</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="fw-semibold">Company</h6>
            <ul className="list-unstyled">
              <li className="list-item">
                <Link href="/">About us</Link>
              </li>
              <li className="list-item">
                <Link href="/">Careers</Link>
              </li>
              <li className="list-item">
                <Link href="/">Blog</Link>
              </li>
              <li className="list-item">
                <Link href="/">Press</Link>
              </li>
              <li className="list-item">
                <Link href="/">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3">
            <h6 className="fw-semibold">Legal</h6>
            <ul className="list-unstyled">
              <li className="list-item">
                <Link href="/">Privacy Policy</Link>
              </li>
              <li className="list-item">
                <Link href="/">Terms of Service</Link>
              </li>
              <li className="list-item">
                <Link href="/">Cookie Policy</Link>
              </li>
              <li className="list-item">
                <Link href="/">GDPR Compliance</Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="mt-4">© 2025 EmotionalClarity. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
