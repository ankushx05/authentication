"use client";
import { flexRender } from "@tanstack/react-table";

import { useDataGridContext } from "./data-grid-context";
import { DataGridEmpty } from "./data-grid-empty";
import { getPinningStyles } from "./utils";
import { Table } from "../table";

import type { Row } from "@tanstack/react-table";

export const DataGridBody = () => {
  const { table, isEmpty } = useDataGridContext();
  return (
    <Table.Body>
      {isEmpty ? <DataGridEmpty /> : null}
      {table.getRowModel().rows.map((row) => {
        return (
          <Table.Row key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <Table.Cell
                  key={cell.id}
                  data-pinned={cell.column.getIsPinned() || undefined}
                  style={{
                    width: cell.column.getSize(),
                    ...getPinningStyles(cell.column),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Table.Cell>
              );
            })}
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};

export interface DataGridBodyProps<T> {
  rows: Row<T>[];
}
