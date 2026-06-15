"use client";
import { useMemo } from "react";

import type { Table as ReactTable } from "@tanstack/react-table";

export const useDataGrid = (props: useDataGrid.Props) => {
  const { table } = props;
  const isEmpty = table.options.data.length === 0;

  return useMemo(
    () => ({
      table,
      isEmpty,
    }),
    [isEmpty, table],
  );
};

export namespace useDataGrid {
  export interface Props {
    table: ReactTable<any>;
    children: React.ReactNode;
  }
}
