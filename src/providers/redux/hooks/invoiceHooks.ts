import IInvoice from "@/entities/interfaces/invoice/IInvoice";
import { saveToInvoice } from "@/features/invoice/invoiceSlice";
import { countInvoiceTotal } from "@/utils/shared";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";

export const useAddToInvoice = () => {
   const dispatch = useAppDispatch();
   const addToInvoice =(invoice: IInvoice) => {
      dispatch(saveToInvoice(invoice))
   }

   return addToInvoice
}

export const useGetInvoice = (invoiceNo: string | undefined) => {
   const invoice = useAppSelector((state) => state.invoices.invoices?.[invoiceNo || '']);

   const total = useMemo(() => {

    return invoice? countInvoiceTotal(invoice) : 0;
  }, [invoice]);

   return {
      invoice,
      total
   }
}

export const useGetInvoices = () => {
   const invoices = useAppSelector((state) => state.invoices.invoices);


   return {
      invoices
   }
}