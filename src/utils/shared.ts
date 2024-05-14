import ICart from "@/entities/interfaces/cart/ICart";
import IInvoice from "@/entities/interfaces/invoice/IInvoice";
import { format } from "date-fns";
import { DEFAULT_CURRENCY } from "./constants";

export const priceFormatter = (text: string | number) => {
   const price = Number(text);
   return `${DEFAULT_CURRENCY} ${numberFormat(`${price}`)}`
}

function numberFormat(number: string, dec = 2, dsep = ',', tsep= '.') {
  if (number == null) return '';

  number = Number(Number(number).toFixed(dec)).toString();
  tsep = typeof tsep == 'string' ? tsep : ',';

  var parts = number.split('.'),
    fnums = parts[0],
    decimals = parts[1] ? (dsep || '.') + parts[1] : '';

  return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
}

export const countCartTotal = (cart?: ICart) => {
  if (!cart) return 0;
    return Object.values(cart).reduce((res, item) => {
      return res + item.quantity * item.productPricePerUnit;
    }, 0);
}

export const countInvoiceTotal = (inv: IInvoice) => {
  return countCartTotal(inv.items)
}

export const formatDate = (date: number) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm')
}

export const getPrinterColumnWidth = (percentageArr: number[], printerWidth: number = 29): number[] => {
  return percentageArr.map(percent => printerWidth * (percent /100))
}