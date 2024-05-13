import IKeyValue from "../shared/IKeyValue"

interface IProduct {
   category?: string,
   brand?: string,
	name: string,
	nameEn?: string,
	nickName?: string,
	code: string,
	barcode?: string,
	units: string[],
	defaultUnit: string,
	prices: 
	IPrice[],
	specs?: IKeyValue<string>[],
   details?: string,
   notes?: string,
	image: string,
	warranty?:  string,
	stock: number,
	stockUnit: string
}

export interface IPrice {
			unit: string,
			price: number,
			qty: number
		}

export default IProduct
