import { IPrice } from "../product/IProduct"


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
      lastModify: Date
   }
