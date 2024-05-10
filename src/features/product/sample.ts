import IProduct from "@/entities/interfaces/product/IProduct";

export const productData: IProduct[] = [
   {
      category: "Power Tools",
      name: "abc",
      nameEn: "",
      nickName: "",
      code: "",
      barcode: "",
      units: ['pcs', 'mid', 'dus'],
      defaultUnit: "pcs",
      prices: 
      [
         {
            unit: "pcs",
            price: 10,
            qty: 1
         },
         {
            unit: "mid",
            price: 12,
            qty: 10
         },
         {
            unit: "dus",
            price: 100,
            qty: 10
         }
      ],
      specs: [
         {
            key: "tegangan",
            value: "4.8v"
         }
      ],
      image: "",
      warranty: "1 year",
      stock: 10,
      stockUnit: "pcs"
   } 
]

export const emptyProductData: IProduct = 
   {
      category: "",
      brand: "",
      name: "",
      nameEn: "",
      nickName: "",
      code: "",
      barcode: "",
      units: ['pcs', 'mid', 'dus'],
      defaultUnit: "pcs",
      prices: 
      [
         {
            unit: "pcs",
            price: 0,
            qty: 1
         },
      ],
      specs: [
      ],
      details: "",
      image: "",
      warranty: "",
      stock: 0,
      stockUnit: "pcs"
   } 
