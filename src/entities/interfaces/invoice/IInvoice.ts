import ICart from "../cart/ICart";
import ICustomer, { Customer } from "../customer/ICustomer";

export type IInvoiceMap = Record<string, IInvoice>

interface IInvoice {
   date?: number | undefined,
   customer?: ICustomer,
   items?: ICart,
   invoiceNo?: string | undefined
}

export class Invoice implements IInvoice{
   invoiceNo: string;
   fullAddress: string;

   constructor(invoiceNo?: string, fullAddress?: string) {
      this.invoiceNo = invoiceNo || '';
      this.fullAddress = fullAddress || '';
   }

   
   get customer(): ICustomer {
      return Customer.setCustomer(this.fullAddress)
   } 


   getInvoiceData(items: ICart): IInvoice {
      const date =  new Date().getTime()
      return {
         date,
         items,
         invoiceNo: this.invoiceNo || `INV${date}`,
         customer: this.customer
      }
   }
}


export default IInvoice