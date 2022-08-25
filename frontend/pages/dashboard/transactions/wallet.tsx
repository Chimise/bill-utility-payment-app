import React from "react";
import AuthLayout from "../../../components/common/AuthLayout/AuthLayout";
import DashboardContainer from "../../../components/ui/DashboardContainer/DashboardContainer";
import DashboardHeader from "../../../components/common/DashboardHeader/DashboardHeader";
import Paper from "../../../components/ui/Paper/Paper";
import UtilityHeader from "../../../components/common/UtilityHeader/UtilityHeader";
import { Funding, tableData, formatDate } from "../../../utils";
import Table, { Header } from "../../../components/common/Table/Table";


const sortBy: Array<{ id: keyof Funding; desc: boolean }> = [
  { id: "date", desc: true },
];

const sortDate: Header<Funding>["sortType"] = (rowA, rowB) => {
  const dateRowA = rowA.original.date.getTime();
  const dateRowB = rowB.original.date.getTime();
  if (dateRowA > dateRowB) {
    return 1;
  } else if (dateRowB > dateRowA) {
    return -1;
  } else {
    return 0;
  }
};

const columns: Header<Funding>[] = [
  {
    Header: "Date",
    accessor: "date",
    sortType: sortDate,
    Cell: ({ value }) => formatDate(value),
  },
  { Header: "Current Balance", accessor: "walletBalance", disableSortBy: true },
  { Header: "Funded Amount", accessor: "amount", disableSortBy: true },
  { Header: "Comment", accessor: "comment", disableSortBy: true },
];

const WalletHistoryPage = () => {
  
  const rowClickHandler = (rowData: Funding) => {
    console.log(rowData);
  };

  return (
    <DashboardContainer>
      <DashboardHeader title="Wallet Funding History" />
      <Paper className="space-y-2 mb-10 md:mb-0">
        <UtilityHeader title="Funding History" />
        <div className="mt-4 mb-10 w-full overflow-y-auto px-8 py-10">
          <Table
            data={tableData}
            columns={columns}
            isLoading={true}
            onRowClick={rowClickHandler}
            sortBy={sortBy}
          />
        </div>
      </Paper>
    </DashboardContainer>
  );
};

WalletHistoryPage.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default WalletHistoryPage;
