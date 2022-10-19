import React from "react";
import AuthLayout from "../../../components/common/AuthLayout/AuthLayout";
import DashboardContainer from "../../../components/ui/DashboardContainer/DashboardContainer";
import DashboardHeader from "../../../components/common/DashboardHeader/DashboardHeader";
import Paper from "../../../components/ui/Paper/Paper";
import UtilityHeader from "../../../components/common/UtilityHeader/UtilityHeader";
import {formatDate } from "../../../utils";
import Table, { Header } from "../../../components/common/Table/Table";
import { PaymentData } from "../../../utils/mutation";
import usePayments from "../../../hooks/usePayments";


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


const WalletHistoryPage = () => {
  const {isLoading, payments, error, mutate} = usePayments()

  return (
    <DashboardContainer>
      <DashboardHeader title="Wallet Funding History" />
      <Paper className="space-y-2 mb-10 md:mb-0">
        <UtilityHeader title="Funding History" />
        <div className="mt-4 mb-10 w-full overflow-y-auto px-8 py-10">
          <Table
            data={payments || []}
            columns={columns}
            isLoading={isLoading}
            sortBy={sortBy}
            error={error}
            onErrorRetry={() => mutate()}
          />
        </div>
      </Paper>
    </DashboardContainer>
  );
};

WalletHistoryPage.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

WalletHistoryPage.isAuth = true;

export default WalletHistoryPage;
