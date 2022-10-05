import React from 'react';
import AuthLayout from '../../../components/common/AuthLayout/AuthLayout';
import DashboardContainer from '../../../components/ui/DashboardContainer/DashboardContainer';
import DashboardHeader from '../../../components/common/DashboardHeader/DashboardHeader';
import Paper from '../../../components/ui/Paper/Paper';
import UtilityHeader from '../../../components/common/UtilityHeader/UtilityHeader';
import {Bill, sampleBills, formatDate} from '../../../utils';
import Table, {Header} from '../../../components/common/Table/Table';

const sortBy: Array<{ id: keyof Bill; desc: boolean }> = [
    { id: "date", desc: true },
  ];
  
  const sortDate: Header<Bill>["sortType"] = (rowA, rowB) => {
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
  
  const columns: Header<Bill>[] = [
    {
      Header: "Date",
      accessor: "date",
      sortType: sortDate,
      Cell: ({ value }) => formatDate(value),
    },
    { Header: "Bill Type", accessor: "billType", disableSortBy: true },
    { Header: "Amount", accessor: "amount", disableSortBy: true },
    { Header: "IUC / Meter No", accessor: "cardNo", disableSortBy: true },
    { Header: "Meter Type", accessor: "meterType", disableSortBy: true },
    { Header: "Distribution Comp", accessor: "disco", disableSortBy: true },
    { Header: "CableTv Type", accessor: "cableTvType", disableSortBy: true },
    { Header: "CableTv Package", accessor: "cableTvPackage", disableSortBy: true },
  ];

const BillsHistoryPage = () => {

    const rowClickHandler = (rowData: Bill) => {
        console.log(rowData);
    }

    return (<DashboardContainer>
        <DashboardHeader title="Bills Funding History" />
        <Paper className='space-y-2 mb-10 md:mb-0'>
            <UtilityHeader title="Funding History" />
            <div className='mt-4 mb-10 w-full overflow-y-auto px-8 py-10'>
                <Table data={sampleBills} columns={columns} isLoading={true} onRowClick={rowClickHandler} sortBy={sortBy}  />
            </div>
        </Paper>
    </DashboardContainer>)
}

BillsHistoryPage.getLayout = (children: React.ReactNode) => {
    return (
        <AuthLayout>
            {children}
        </AuthLayout>
    )
}

BillsHistoryPage.isAuth = true;

export default BillsHistoryPage;