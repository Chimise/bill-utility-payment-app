import React from "react";
import {
  useTable,
  usePagination,
  UseSortByColumnOptions,
  useSortBy,
  SortingRule,
} from "react-table";
import { ChevronDownIcon } from "@heroicons/react/solid";

import ToolTip from "../../ui/Tooltip/Tooltip";
import TablePagination from "./TablePagination";
import { formatDate } from "../../../utils";
import Spinner from "../../ui/Spinner/Spinner";
import RequestError from "../../../utils/RequestError";
import Error from "../../ui/Error/Error";

export interface Header<T extends object = {}>
  extends UseSortByColumnOptions<T> {
  Header: string;
  accessor: keyof T;
  Cell?: ({value}: {value: string}) => any;
}

export interface TableProps<T extends object = {}> {
  columns: Header<T>[];
  data: T[];
  defaultPageSize?: number;
  defaultPageIndex?: number;
  isLoading: boolean;
  sortBy: SortingRule<T>[];
  error: RequestError | undefined;
  onErrorRetry: () => void;
}

function Table<T extends object = {}>({
  columns,
  data,
  defaultPageIndex = 0,
  defaultPageSize = 5,
  isLoading,
  sortBy,
  error,
  onErrorRetry
}: TableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns: columns,
      data: data,
      initialState: {
        pageIndex: defaultPageIndex,
        sortBy: sortBy,
        pageSize: defaultPageSize,
      },
      maxMultiSortColCount: 2,
      disableSortRemove: true,
      disabledMultiRemove: true,
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="min-w-[700px] rounded-md shadow-sm shadow-gray-300">
      <table
        className="min-w-full border border-slate-200 table-fixed border-collapse"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
              className="bg-gray-100 text-slate-700 h-14"
            >
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  className="text-left first:pl-6 last:pr-6 p-2 border-0 border-b border-slate-200"
                  // @ts-ignore
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={`${index}-${columnIndex}`}
                >
                  <span className="flex items-center w-full space-x-1">
                    <span>{column.render("Header")}</span>
                      {/* @ts-ignore */}
                      {column.isSorted ? (
                        <span className="shrink-0">
                        <ChevronDownIcon
                          className={`text-sm font-medium transition-transform w-5 h-5 ${
                            // @ts-ignore
                            column.isSortedDesc ? "rotate-0" : "rotate-180"
                          }`}
                        />
                        </span>
                      ) : null}
                    <span className="flex-1" />
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {isLoading && <div className="w-full flex items-center justify-center">
          <Spinner className="py-10 px-4" size='2x' />
          </div>}
        {data.length > 0 && (<tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);

            return (
              <tr
                className="hover:bg-gray-100 bg-white h-[54px]"
                {...row.getRowProps()}
                key={index}
              >
                {row.cells.map((cell, cellIndex) => {
                  return (
                    <td
                      className="text-left first:pl-6 last:pr-6 truncate text-md p-2 border-0 border-b border-slate-200 align-middle h-[53px]"
                      {...cell.getCellProps()}
                      key={`${index}-${cellIndex}`}
                    >
                      <ToolTip title={cell.column.id === 'createdAt' ? formatDate(cell.value) : cell.value}>
                        {cell.render("Cell")}
                      </ToolTip>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>)}

        {data.length === 0 && !isLoading && (<div className="py-10 w-full" />)}

          {error && <Error className="p-5 md:p-7 w-full" error={error.message} onRetry={onErrorRetry} />}
      </table>
      <TablePagination data={data} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} canNextPage={canNextPage} canPreviousPage={canPreviousPage} pageCount={pageCount} gotoPage={gotoPage} previousPage={previousPage} nextPage={nextPage} />
    </div>
  );
}

export default Table;
