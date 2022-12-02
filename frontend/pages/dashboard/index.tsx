import React from "react";
import Link from "next/link";
import { NextSeo } from "next-seo";
import AuthLayout from "../../components/common/AuthLayout/AuthLayout";
import OverviewPaper from "../../components/common/OverviewPaper/OverviewPaper";
import Table, { Header } from "../../components/common/Table/Table";
import { formatDate } from "../../utils";
import DashboardContainer from "../../components/ui/DashboardContainer/DashboardContainer";
import useUser from "../../hooks/useUser";
import Paper from "../../components/ui/Paper/Paper";
import usePayments from '../../hooks/usePayments';
import { PaymentData } from "../../utils/mutation";

const sortBy: Array<{ id: keyof PaymentData; desc: boolean }> = [
  { id: "createdAt", desc: true },
];

const sortDate: Header<PaymentData>["sortType"] = (rowA, rowB) => {
  const dateRowA = new Date(rowA.original.createdAt).getTime();
  const dateRowB = new Date(rowB.original.createdAt).getTime();
  if (dateRowA > dateRowB) {
    return 1;
  } else if (dateRowB > dateRowA) {
    return -1;
  } else {
    return 0;
  }
};

const columns: Header<PaymentData>[] = [
  { Header: "Reference", accessor: "reference", disableSortBy: true },
  {
    Header: "Date",
    accessor: "createdAt",
    sortType: sortDate,
    Cell: ({ value }) => formatDate(value),
  },
  { Header: "Amount", accessor: "amount", disableSortBy: true },
  { Header: "Curr Bal", accessor: "currentBal", disableSortBy: true },
  { Header: "Prev Bal", accessor: "prevBal", disableSortBy: true },
  { Header: "Method", accessor: "method", disableSortBy: true }
  
];


const Dashboard = () => {
  const {isLoading: paymentsIsLoading, error: paymentsError, payments, mutate} = usePayments()
  
  const {user, isLoading} = useUser();

  return (
    <div>
      <NextSeo
        title="Dashboard"
        description="View your transactions, payments on your dashboard"
        nofollow
        noindex
      />
      <div className="flex items-center px-4 py-5 shadow-sm bg-white justify-between border-0 border-y-px space-x-3">
        <p className="text-2xl font-semibold text-gray-900">
          Welcome Back, {user && <span>{user.firstName} {user.lastName}</span>}
        </p>
        <Link href="/dashboard/wallet/fund">
          <a className="text-white text-xs font-medium px-3 py-2 bg-slate-800 transition-colors hover:bg-slate-600 hover:text-slate-100 rounded-md shadow-sm shadow-black/50 shrink-0">
            Add Funds
          </a>
        </Link>
      </div>

      <DashboardContainer className="mt-6 space-y-3">
        <h4 className="text-xl">Overview</h4>
        <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 lg:gap-x-5">
            {isLoading && <Paper className="p-6 animate-pulse bg-gray-200" />}
            {user && <OverviewPaper header="Wallet" content={user.amount} />}
            <OverviewPaper header="Transactions" content={payments ? payments.length : 0} />
        </div>
      </DashboardContainer>

      <DashboardContainer className="space-y-0.5 mt-7">
        <h5 className="text-xl">Recent Wallet Funding</h5>
        <div className="overflow-y-auto py-5">
          <Table
            data={payments || []}
            columns={columns}
            isLoading={paymentsIsLoading}
            sortBy={sortBy}
            error={paymentsError}
            onErrorRetry={() => mutate()}
          />
        </div>
      </DashboardContainer>

      <div className="h-40"></div>
    </div>
  );
};

Dashboard.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

Dashboard.isAuth = true;

export default Dashboard;
