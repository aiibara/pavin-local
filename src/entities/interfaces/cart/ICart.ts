import { IPrice } from "../product/IProduct";


export default interface ICart {
   [key: string] : IProductCart
}

export interface IProductCart {
      productCode: string,
      productBrand: string,
      productName: string,
      productUnit: string,
      productPricePerUnit: number,
      quantity: number,
      currentPrices: IPrice[]
      lastModify?: number,
      
   }

export class ProductCart implements Partial<IProductCart> {
   productCode?: string | undefined;
   productUnit?: string | undefined;

   constructor(productCart: Partial<IProductCart>){
      this.productCode = productCart.productCode
      this.productUnit = productCart.productUnit
   }

   get key(): string {
      return `${this.productCode}_${this.productUnit}`
   }
}