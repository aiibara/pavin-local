import IProduct from "@/entities/interfaces/product/IProduct";
import { saveProduct } from "@/features/product/productSlice";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";

export const useAddProduct = () => {
   const dispatch = useAppDispatch();
   const addProduct =(prod:IProduct) => {
      dispatch(saveProduct(prod))
   }

   return addProduct
}

export const useGetProducts = () => {
   const products = useAppSelector((state) => state.product.products);
   return products
}

export const useViewProductsList = () => {
   const prods = useGetProducts();
   const [searchValue, setSearchValue] = useState('');

   const products = useMemo(()=> {
      if(searchValue === '') return prods;
      return prods.filter(prod => {
         return [
            prod.brand, 
            prod.code,
            prod.name,
            prod.nameEn,
            prod.nameEn,
            prod.notes
         ].join(' ').toLowerCase().includes(searchValue.toLowerCase())
      })
   }, [prods, searchValue])

   return {
      products,
      searchValue,
      setSearchValue
   }
}