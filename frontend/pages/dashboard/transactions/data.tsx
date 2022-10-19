import React from "react";
import AuthLayout from "../../../components/common/AuthLayout/AuthLayout";
import DashboardContainer from "../../../components/ui/DashboardContainer/DashboardContainer";
import DashboardHeader from "../../../components/common/DashboardHeader/DashboardHeader";
import Paper from "../../../components/ui/Paper/Paper";
import UtilityHeader from "../../../components/common/UtilityHeader/UtilityHeader";
import { formatDate, convertDataToString } from "../../../utils";
import Table, { Header } from "../../../components/common/Table/Table";
import useDataPurchases, {
  DataPurchase,
} from "../../../hooks/useDataPurchases";

const sortBy: Array<{ id: keyof DataPurchase; desc: boolean }> = [
  { id: "createdAt", desc: true },
];

const sortDate: Header<DataPurchase>["sortType"] = (rowA, rowB) => {
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

const columns: Header<DataPurchase>[] = [
  { Header: "Trans Id", accessor: "trans_id", disableSortBy: true },
  { Header: "Recipient", accessor: "recipient", disableSortBy: true },
  //Ignore type error caused by accessing nested objects in the accessor field
  //@ts-ignore
  { Header: "Provider", accessor: "provider.name", disableSortBy: true }, 
  {
    Header: "Plan",
    //@ts-ignore
    accessor: "plan.value",
    disableSortBy: true,
    Cell: ({ value }) => convertDataToString(Number(value)),
  },
  {
    Header: "Amount",
    //@ts-ignore
    accessor: "plan.selling_price",
    disableSortBy: true,
  },
  {
    Header: "Date",
    accessor: "createdAt",
    sortType: sortDate,
    Cell: ({ value }) => formatDate(value),
  },
  //@ts-ignore
  { Header: "Type", accessor: "plan.type", disableSortBy: true },
];

const OrdersHistoryPage = () => {
  const { data, error, mutate, isLoading } = useDataPurchases();

  return (
    <DashboardContainer>
      <DashboardHeader title="Orders Funding History" />
      <Paper className="space-y-2 mb-10 md:mb-0">
        <UtilityHeader title="Funding History" />
        <div className="mt-4 mb-10 w-full overflow-y-auto px-8 py-10">
          <Table
            data={data || []}
            columns={columns}
            isLoading={isLoading}
            sortBy={sortBy}
            error={error}
            onErrorRetry={() => mutate}
          />
        </div>
      </Paper>
    </DashboardContainer>
  );
};

OrdersHistoryPage.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

OrdersHistoryPage.isAuth = true;

export default OrdersHistoryPage;
