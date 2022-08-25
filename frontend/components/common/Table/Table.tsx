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

export interface Header<T extends object = {}>
  extends UseSortByColumnOptions<T> {
  Header: string;
  accessor: keyof T;
  Cell?: ({value}: {value: Date}) => any;
}

export interface TableProps<T extends object = {}> {
  columns: Header<T>[];
  data: T[];
  defaultPageSize?: number;
  defaultPageIndex?: number;
  isLoading: boolean;
  sortBy: SortingRule<T>[];
  onRowClick: (original: T) => void;
}

function Table<T extends object = {}>({
  columns,
  data,
  defaultPageIndex = 0,
  defaultPageSize = 5,
  isLoading,
  sortBy,
  onRowClick,
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
    <div className="min-w-[700px] shadow-[0px_3px_3px_-2px_rgba(0,0,0,0.2),0px_3px_4px_0px_rgba(0,0,0,0.14),0px_1px_8px_0px_rgba(0,0,0,0.12)]">
      <table
        className="w-full border border-slate-200 table-fixed border-collapse min-h-[300px]"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
              className="bg-slate-100 text-slate-700"
            >
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  className="text-left p-2 border-0 border-b border-slate-200"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={`${index}-${columnIndex}`}
                >
                  <span className="flex items-center w-full space-x-3">
                    <span>{column.render("Header")}</span>
                    <span className="shrink-0">
                      {column.isSorted ? (
                        <ChevronDownIcon
                          className={`text-sm font-medium transition-transform w-5 h-5 ${
                            column.isSortedDesc ? "rotate-0" : "rotate-180"
                          }`}
                        />
                      ) : null}
                    </span>
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);

            return (
              <tr
                className="hover:bg-slate-300 h-[54px]"
                {...row.getRowProps()}
                key={index}
                onClick={() => onRowClick(row.original)}
              >
                {row.cells.map((cell, cellIndex) => {
                  return (
                    <td
                      className="text-left truncate text-md p-2 border-0 border-b border-slate-200 align-middle h-[53px]"
                      {...cell.getCellProps()}
                      key={`${index}-${cellIndex}`}
                    >
                      <ToolTip title={cell.value instanceof Date ? formatDate(cell.value) : cell.value}>
                        {cell.render("Cell")}
                      </ToolTip>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination data={data} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} canNextPage={canNextPage} canPreviousPage={canPreviousPage} pageCount={pageCount} gotoPage={gotoPage} previousPage={previousPage} nextPage={nextPage} />
    </div>
  );
}

export default Table;
