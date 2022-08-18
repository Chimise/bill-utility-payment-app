import React from 'react';
import AuthLayout from '../../../components/common/AuthLayout/AuthLayout';
import DashboardContainer from '../../../components/ui/DashboardContainer/DashboardContainer';
import DashboardHeader from '../../../components/common/DashboardHeader/DashboardHeader';
import Paper from '../../../components/ui/Paper/Paper';
import UtilityHeader from '../../../components/common/UtilityHeader/UtilityHeader';
import {Order, orders, formatDate} from '../../../utils';
import Table, {Header} from '../../../components/common/Table/Table';

const sortBy: Array<{ id: keyof Order; desc: boolean }> = [
  { id: "date", desc: true },
];

const sortDate: Header<Order>["sortType"] = (rowA, rowB) => {
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
  

  const columns: Header<Order>[] = [
    {
      Header: "Date",
      accessor: "date",
      sortType: sortDate,
      Cell: ({ value }) => formatDate(value),
    },
    { Header: "Type", accessor: "type", disableSortBy: true },
    { Header: "Recipients", accessor: "recipients", disableSortBy: true },
    { Header: "Provider", accessor: "provider", disableSortBy: true },
    { Header: "Plan", accessor: "plan", disableSortBy: true },
    { Header: "Amount", accessor: "amount", disableSortBy: true },
    { Header: "Total", accessor: "total", disableSortBy: true },
  ];


const OrdersHistoryPage = () => {

    const rowClickHandler = (rowData: Order) => {
        console.log(rowData);
    }

    return (<DashboardContainer>
        <DashboardHeader title="Orders Funding History" />
        <Paper className='space-y-2 mb-10 md:mb-0'>
            <UtilityHeader title="Funding History" />
            <div className='mt-4 mb-10 w-full overflow-y-auto px-8 py-10'>
                <Table data={orders} columns={columns} isLoading={true} onRowClick={rowClickHandler} sortBy={sortBy}  />
            </div>
        </Paper>
    </DashboardContainer>)
}

OrdersHistoryPage.getLayout = (children: React.ReactNode) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}



export default OrdersHistoryPage;