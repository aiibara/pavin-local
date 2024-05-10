import { saveBrand } from "@/features/config/configSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const useAddBrand = () => {
   const dispatch = useAppDispatch();
   const addBrand =(brand:string) => {
      dispatch(saveBrand(brand))
   }

   return addBrand
}

export const useGetBrands = () => {
   const brands = useAppSelector((state) => state.config.config.brands);
   return brands
}