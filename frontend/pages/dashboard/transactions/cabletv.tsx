import React from 'react';
import { NextSeo } from 'next-seo';
import AuthLayout from '../../../components/common/AuthLayout/AuthLayout';
import DashboardContainer from '../../../components/ui/DashboardContainer/DashboardContainer';
import DashboardHeader from '../../../components/common/DashboardHeader/DashboardHeader';
import Paper from '../../../components/ui/Paper/Paper';
import UtilityHeader from '../../../components/common/UtilityHeader/UtilityHeader';
import {formatDate} from '../../../utils';
import Table, {Header} from '../../../components/common/Table/Table';
import useCableTvBills, {CableTvPurchase} from '../../../hooks/useCableTvBills';


const sortBy: Array<{ id: keyof CableTvPurchase; desc: boolean }> = [
    { id: "createdAt", desc: true },
  ];
  
  const sortDate: Header<CableTvPurchase>["sortType"] = (rowA, rowB) => {
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

  
  const columns: Header<CableTvPurchase>[] = [
    { Header: "Trans Id", accessor: 'trans_id', disableSortBy: true },
    //@ts-ignore
    { Header: "Amount", accessor: "plan.selling_price", disableSortBy: true },
    { Header: "IUC No", accessor: "cardNo", disableSortBy: true },
    //@ts-ignore
    { Header: "CableTv", accessor: "plan.name", disableSortBy: true },
    {Header: "Status", accessor: "status", disableSortBy: true},
    {
      Header: "Date",
      accessor: "createdAt",
      sortType: sortDate,
      Cell: ({ value }) => formatDate(value),
    },

  ];

const BillsHistoryPage = () => {
    const {data, error, isLoading, mutate} = useCableTvBills()
    return (<DashboardContainer>
      <NextSeo
        title="Cabletv Payment History"
        description="View all previous cabletv purchase transactions"
        nofollow
        noindex
      />
        <DashboardHeader title="Bills Funding History" />
        <Paper className='space-y-2 mb-10 md:mb-0'>
            <UtilityHeader title="Funding History" />
            <div className='mt-4 mb-10 w-full overflow-y-auto px-8 py-10'>
                <Table data={data || []} columns={columns} isLoading={isLoading} sortBy={sortBy} error={error} onErrorRetry={() => mutate()}  />
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