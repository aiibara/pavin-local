import IInvoice from "@/entities/interfaces/invoice/IInvoice";
import { saveToInvoice } from "@/features/invoice/invoiceSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const useAddToInvoice = () => {
   const dispatch = useAppDispatch();
   const addToInvoice =(invoice: IInvoice) => {
      dispatch(saveToInvoice(invoice))
   }

   return addToInvoice
}

export const useGetInvoice = (invoiceNo: string) => {
   const invoice = useAppSelector((state) => state.invoices.invoices?.[invoiceNo]);

   return {
      invoice
   }
}

export const useGetInvoices = () => {
   const invoices = useAppSelector((state) => state.invoices.invoices);


   return {
      invoices
   }
}