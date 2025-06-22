import React from "react";
import Layout from "./Layout";
import DashboardSidebarMenu from "./DashboardSidebarMenu";
import DashboardNavBar from "./DashboardNavBar";
import DashboardOffCanvas from "./DashboardOffCanvas";
import { useRouter } from "next/router";

function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();
  const page = router.pathname as string;
  return (
    <Layout title={title}>
      {" "}
      <DashboardNavBar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-xl-2 d-none d-lg-block vh-100 border-end d-flex justify-content-center py-3">
            <DashboardSidebarMenu page={page} />
          </div>
          <div className="col-lg-9 col-xl-10 p-3 bg-light">{children}</div>
        </div>
      </div>
      <DashboardOffCanvas page={page} />
    </Layout>
  );
}

export default DashboardLayout;
