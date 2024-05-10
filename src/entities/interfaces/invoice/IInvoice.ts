import ICart from "../cart/ICart"

export type IInvoiceMap = Record<string, IInvoice>

interface IInvoice {
   date?: Date,
   customer: string,
   items: ICart,
   invoiceNo: string
}


export default IInvoice