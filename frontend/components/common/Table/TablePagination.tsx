import React from "react";
const pageSizes = [5, 10, 15, 20, 25];
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import { UsePaginationInstanceProps } from "react-table";

interface TablePaginationProps<D extends object = {}>
  extends Omit<UsePaginationInstanceProps<D>, 'page' | 'pageOptions'> {
  pageSize: number;
  pageIndex: number;
  data: Array<D>;
}

function TablePagination<D extends object = {}>({
  setPageSize,
  pageSize,
  pageIndex,
  canNextPage,
  canPreviousPage,
  gotoPage,
  previousPage,
  nextPage,
  pageCount,
  data,
}: TablePaginationProps<D>) {
  return (
    <div className="flex items-center justify-end space-x-7 px-3 py-3 border border-t-0 border-slate-200">
      <div className="space-x-3">
        <label htmlFor="rowSize">Row per page:</label>
        <select
          id="rowSize"
          value={pageSize}
          className="border-0 focus:border-0 focus:bg-white py-1 bg-transparent"
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {pageSizes.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </div>
      <span>
        {pageIndex * pageSize + 1}-
        {canNextPage ? (pageIndex + 1) * pageSize : data.length} of{" "}
        {data.length}
      </span>
      <div className="inline-flex items-center space-x-2">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="group text-gray-700 hover:bg-gray-400 p-2 rounded-full disabled:text-gray-400 disabled:hover:bg-transparent"
        >
          <span className="w-5 h-5 block relative before:absolute before:left-px before:top-[50%] before:w-[2px] before:h-3 before:-translate-y-1/2 before:bg-gray-700 group-disabled:before:bg-gray-400">
            <ChevronLeftIcon className="w-full h-full" />
          </span>
        </button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="text-gray-700 hover:bg-gray-400 p-2 rounded-full disabled:text-gray-400 disabled:hover:bg-transparent"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="text-gray-700 hover:bg-gray-400 p-2 rounded-full disabled:text-gray-400 disabled:hover:bg-transparent"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="group text-gray-700 hover:bg-gray-400 p-2 rounded-full disabled:text-gray-400 disabled:hover:bg-transparent"
        >
          <span className="w-5 h-5 block relative before:absolute before:right-px before:top-[50%] before:w-[2px] before:h-3 before:-translate-y-1/2 before:bg-gray-700 group-disabled:before:bg-gray-400">
            <ChevronRightIcon className="w-full h-full" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default TablePagination;
