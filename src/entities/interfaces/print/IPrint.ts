import { ColumnAlignment } from "react-native-thermal-receipt-printer-image-qr";

export enum ComponentOption {
  Text = 'Text',
  TextArea = 'TextArea',
  Barcode = 'Barcode',
  QrCode = 'QrCode',
  Table = 'Table',
}

export type PrintDataItem =
  | PrintDataTextItem
  | PrintDataBarcodeItem
  | PrintDataTableItem;

export interface PrintDataTextItem {
  key: string;
  type: ComponentOption.Text | ComponentOption.TextArea;
  content: string;
  isHide?: boolean;
  label?: string;
  isBold?: boolean;
  isCenter?: boolean;
}

export interface PrintDataBarcodeItem {
  key: string;
  type: ComponentOption.QrCode | ComponentOption.Barcode;
  content: string;
  isHide?: boolean;
  label?: string;
}

export interface PrintDataTableItem {
  key: string;
  type: ComponentOption.Table;
  content: string[][];
  tableOptions?: {
    header: string[];
    columnWidth: number[];
    columnAlignment: ColumnAlignment[];
    columnStyle: string[];
  };
  isHide?: boolean;
}