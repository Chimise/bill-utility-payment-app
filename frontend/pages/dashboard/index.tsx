import React from "react";
import Link from "next/link";
import AuthLayout from "../../components/common/AuthLayout/AuthLayout";
import OverviewPaper from "../../components/common/OverviewPaper/OverviewPaper";
import Table, {Header} from "../../components/common/Table/Table";



interface Songs {
  id: number;
  song: string;
  artist: string;
  year: number;
}

const tableData: Songs[] = [
  {
    id: 1,
    song: "The Sliding Mr.Bones (Next Stop, Pottersville)",
    artist: "Malcom Lockyer",
    year: 1961,
  },
  { id: 2, song: "Witchy Woman", artist: "The Eagles", year: 1972 },
  { id: 3, song: "Shining Star", artist: "Earth, Wind and Fire", year: 1990 },
  { id: 4, song: "The slut", artist: "Justin Bebier", year: 2017 },
  { id: 5, song: "Locked Away", artist: "Rick Ross", year: 1997 },
  { id: 6, song: "Hello Baby", artist: "Shawman Senge", year: 1995 },
  { id: 7, song: "Baby Baby", artist: "Justin Bieber", year: 1994 },
  { id: 8, song: "Bathroom Miss", artist: "Angel Kele", year: 2022 },
  { id: 9, song: "Hello Africa", artist: "Shakira", year: 2017 },
  { id: 10, song: "Bad Guy", artist: "Billie Elish", year: 2016 },
  { id: 11, song: "Iyamo Mi", artist: "Sisi", year: 2020 },
  { id: 12, song: "Lonely", artist: "Akon Jay", year: 1999 },
  { id: 13, song: "Kwaku the Black Traveller", artist: "Black Sheriff", year: 2022 },
  { id: 14, song: "Location", artist: "khalid", year: 2014 },
  { id: 15, song: "Shape of You", artist: "Ed Sheeran", year: 2018 },
  { id: 16, song: "Uptown Funk", artist: "Bruno Mars", year: 2021 },
  { id: 17, song: "Kuchi Kuchi", artist: "J'Odie", year: 2005 },
  { id: 18, song: "Looking Glass", artist: "Yanni", year: 2007 },
  { id: 19, song: "Time after Time", artist: "Cyndi Lauper", year: 2019 },
  { id: 20, song: "Bambi", artist: "Jidenna Uche", year: 2017 },
];

const sortDate: Header<Songs>['sortType']  = (row1 ,row2) => {
  return row1.original.year > row2.original.year ? 1 : -1;

}

const sortBy: Array<{id: keyof Songs; desc: boolean}> = [{id: 'year', desc: true}];

const columns: Header<Songs>[] = [
  {Header: 'Id', accessor: 'id', disableSortBy: true},
  { Header: "Year", accessor: "year", sortType: sortDate },
  { Header: "Song", accessor: "song", disableSortBy: true },
  { Header: "Artist", accessor: "artist", disableSortBy: true },
  
  
];

const overviews = [{header: 'Wallet', content: 0}, {header: 'Transactions', content: 0}]

const Dashboard = () => {

  const rowClickHandler = (row: Songs) => {

  }

  return (
    <div>
      <div className="flex items-center px-4 py-5 shadow-sm bg-white justify-between border-0 border-y-px space-x-3">
        <p className="text-2xl font-semibold text-gray-900">
          Welcome Back, Chisom Promise
        </p>
        <Link href="/dashboard/wallet/fund">
          <a className="text-white text-xs font-medium px-3 py-2 bg-slate-800 transition-colors hover:bg-slate-600 hover:text-slate-100 rounded-md shadow-sm shadow-black/50 shrink-0">
            Add Funds
          </a>
        </Link>
      </div>

        <div className="mx-auto w-11/12 mt-6 space-y-3">
            <h4 className="text-xl">Overview</h4>
            <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-2 lg:gap-x-5">
                {overviews.map(overview => (<OverviewPaper key={overview.header} {...overview} />))} 
            </div>
        </div>

        <div className="mx-auto w-11/12 space-y-0.5 mt-7">
          <h5 className='text-xl'>Recent Activity</h5>
          <div className="overflow-y-auto py-5">
          <Table data={tableData} columns={columns} isLoading={true} sortBy={sortBy} onRowClick={rowClickHandler} />
          </div>
          
        </div>

        <div className="h-40">
            
        </div>
    </div>
  );
};

Dashboard.getLayout = (children: React.ReactNode) => {
  return <AuthLayout>{children}</AuthLayout>;
};

export default Dashboard;
