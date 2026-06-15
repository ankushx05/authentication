"use client";
import { Table } from "../table";
import { useDataGridContext } from "./data-grid-context";

export const DataGridEmpty = () => {
  const { table } = useDataGridContext();
  const totalColumns = table.getAllColumns().length;
  return (
    <Table.Row>
      <Table.Cell colSpan={totalColumns}>No data available</Table.Cell>
    </Table.Row>
  );
};

export namespace DataGridEmpty {
  export interface Props {}
}
