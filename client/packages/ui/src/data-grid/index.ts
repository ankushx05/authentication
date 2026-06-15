import { DataGrid as DataGridRoot } from "./data-grid";
import { DataGridBody } from "./data-grid-body";
import { DataGridColumnVisibility } from "./data-grid-column-visibility";
import { DataGridHeader, DataGridHeaderColumn } from "./data-grid-header";
import {
  DataGridPagination,
  DataGridPaginationSelector,
} from "./data-grid-pagination";
import {
  DataGridRowSelect,
  DataGridRowSelectAll,
} from "./data-grid-row-select";
import { DataGridTable } from "./data-grid-table";

export { useDataGridTable } from "./use-react-table";

export const DataGrid = Object.assign(DataGridRoot, {
  Body: DataGridBody,
  ColumnVisibility: DataGridColumnVisibility,
  HeaderColumn: DataGridHeaderColumn,
  Header: DataGridHeader,
  Pagination: DataGridPagination,
  PaginationSelector: DataGridPaginationSelector,
  RowSelect: DataGridRowSelect,
  RowSelectAll: DataGridRowSelectAll,
  Table: DataGridTable,
});

export namespace DataGrid {
  export interface Props extends DataGridRoot.Props {}
  export interface ColumnVisibility extends DataGridColumnVisibility.Props {}
  export interface HeaderColumn extends DataGridHeaderColumn.Props {}
  export interface Header extends DataGridHeader.Props {}
  export interface Pagination extends DataGridPagination.Props {}
  export interface Table extends DataGridTable.Props {}
}
