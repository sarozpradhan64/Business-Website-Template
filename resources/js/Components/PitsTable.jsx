import React from "react";
import { useTable, useSortBy } from "react-table";
// uses react-tables
export default function PitsTable({ data, columns }) {
    // using react tables package
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <div className="overflow-x-auto relative shadow-md my-5 sm:rounded-md">
            <table
                className="w-full text-sm text-left text-primary w-full"
                {...getTableProps()}
            >
                <thead className="text-xs text-primary uppercase bg-purple-700 select-none">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                    className={`text-white py-3 px-6`}
                                    scope="col"
                                >
                                    {column.render("Header")}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? " 🔽"
                                                : " 🔼"
                                            : ""}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr
                                className="border-gray-700 bg-secondary hover:bg-primary"
                                {...row.getRowProps()}
                            >
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            className={`py-2 px-6 h-12 `}
                                            {...cell.getCellProps()}
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
