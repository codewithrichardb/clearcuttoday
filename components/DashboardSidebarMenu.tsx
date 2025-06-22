import Link from "next/link";
import React from "react";
import { AiFillDashboard, AiOutlineBarChart } from "react-icons/ai";
import { FaBook } from "react-icons/fa";

export type Menu = {
  name: string;
  link: string;
  icon: React.ReactNode;
};

export const menus: Menu[] = [
  { name: "Overview", link: "/dashboard", icon: <AiFillDashboard /> },
  { name: "Journal", link: "/journals", icon: <FaBook /> },
  { name: "Progress", link: "/reports", icon: <AiOutlineBarChart /> },
];

function DashboardSidebarMenu({ page }: { page: string }) {
  return (
    <>
      {menus?.map((menu) => (
        <React.Fragment key={menu.name}>
          <Link
            href={menu.link}
            className={`nav-link d-flex align-items-center px-3 py-1 mb-2 fw-normal ${
              page == menu.link
                ? "bg-primary bg-opacity-10 rounded-2 px-3 text-primary"
                : ""
            } text-start`}
            type="button"
            role="tab"
            aria-selected="true"
          >
            <span className="me-2 mb-1">{menu.icon}</span>
            <span>{menu.name}</span>
          </Link>
        </React.Fragment>
      ))}
    </>
  );
}

export default DashboardSidebarMenu;
