"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface Patient {
  id: number;
  name: string;
  time: string;
}

const data: Patient[] = [
  { id: 1, name: "Rishikesh Chauhan", time: "5:15 AM" },
  { id: 2, name: "Damru bandu", time: "5:20 AM" },
  { id: 3, name: "Baggan karle", time: "5:25 AM" },
  { id: 4, name: "Shambo kolte", time: "5:30 AM" },
  { id: 5, name: "Stephen harry", time: "5:35 AM" },
  { id: 6, name: "Damru bandu", time: "5:20 AM" },
  { id: 7, name: "Baggan patel", time: "5:25 AM" },
  { id: 8, name: "Baggan singh", time: "5:30 AM" },
  { id: 9, name: "Baggan sharma", time: "5:35 AM" },
  { id: 10, name: "Baggan kumar sharma", time: "5:20 AM" },
  { id: 11, name: "Rahul Kumar", time: "5:25 AM" },
  { id: 12, name: "Mohit", time: "5:30 AM" },
  { id: 13, name: "Suraj Yadav", time: "5:35 AM" },
];

const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "id",
    header: "No.",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
];

const PatientsTable = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <Table>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientsTable;
