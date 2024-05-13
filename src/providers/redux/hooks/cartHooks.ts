import { IProductCart } from "@/entities/interfaces/cart/ICart";
import ICustomer from "@/entities/interfaces/customer/ICustomer";
import { clearCart, editCartItem, editCartItemQty, removeCardItem, saveToCart, setCartInvoiceDetail } from "@/features/cart/cartSlice";
import { countCartTotal } from "@/utils/shared";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";

export const useAddToCart = () => {
   const dispatch = useAppDispatch();
   const addToCart =(productCard: IProductCart) => {
      dispatch(saveToCart(productCard))
   }

   return addToCart
}

export const useGetCart = () => {
   const cart = useAppSelector((state) => state.cart.cart);

  const total = useMemo(() => {
    return countCartTotal(cart);
  }, [cart]);

   return {
      cart,
      cartTotal: total,
   }
}

export const useGetCardItemCount = (productKey: string) => {
   const itemCardCount = useAppSelector((state) => state.cart.cart?.[productKey]?.quantity);

   return itemCardCount
}

export const useEditCartItem = () => {
    const dispatch = useAppDispatch();
   const editItemPrice =(productCode: string, productUnit: string, price: number) => {
      dispatch(editCartItem({
         productUnit,
         productCode,
         productPricePerUnit: price
      }))
   }

   const editItemQty = (productCode: string, productUnit: string, quantity: number) => {
      dispatch(editCartItemQty({
         productUnit,
         productCode,
         quantity: quantity
      }))
   }

   const removeItem = (productCode: string, productUnit: string) => {
      dispatch(removeCardItem({
         productUnit,
         productCode
      }))
   }

   return {editItemPrice, editItemQty} 
}

export const useDeleteCartItem = () => {
    const dispatch = useAppDispatch();

   const removeItem = (productCode: string, productUnit: string) => {
      dispatch(removeCardItem({
         productUnit,
         productCode
      }))
   }

   return {removeItem} 
}

export const useGetCartInvoice = () => {
   const cartInvoice = useAppSelector((state) => state.cart.invoice);

   return cartInvoice
}

export const useSetCartInvoice = () => {
   const dispatch = useAppDispatch();

   const setCartInvoice = (customer: ICustomer, invoiceNo: string) => {
      dispatch(setCartInvoiceDetail({
         customer: {
            ...customer
         },
         invoiceNo: invoiceNo,
      }))
   }

   return setCartInvoice
}

export const useClearCart = () => {
   const dispatch = useAppDispatch();

   const clearCartData = () => {
      dispatch(clearCart())
   }

   return clearCartData
}