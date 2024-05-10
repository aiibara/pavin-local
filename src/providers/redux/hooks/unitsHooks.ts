import { saveUnit } from "@/features/config/configSlice";
import { useAppDispatch, useAppSelector } from "../hooks";

export const useAddUnit = () => {
   const dispatch = useAppDispatch();
   const addUnit =(unit:string) => {
      dispatch(saveUnit(unit))
   }

   return addUnit
}

export const useGetUnit = () => {
   const units = useAppSelector((state) => state.config.config.units);
   return units
}