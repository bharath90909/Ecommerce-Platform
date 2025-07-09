import React, { memo } from "react";
import Layout from "../../../components/layout/Layout";
import DashboardTab from "./DashboardTab";

const Dashboard: React.FC = memo(() => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your products and view analytics
          </p>
        </div>

        <DashboardTab />
      </div>
    </Layout>
  );
});

Dashboard.displayName = "Dashboard";

export default Dashboard;
