interface ICustomer {
   id?: string;
   name: string;
   address?: {
      street?: string,
      city?: string
   }
   phone?: string[]
}

export default ICustomer;


export class Customer implements ICustomer{
   id?: string | undefined;
   name: string;
   address?: { street?: string | undefined; city?: string | undefined; } | undefined;
   phone?: string[] | undefined;

   constructor(cust?: ICustomer) {
      this.name = cust?.name || '',
      this.address = cust?.address,
      this.phone = cust?.phone,
      this.id = cust?.id
   }

   static getFullAddress(customer?: ICustomer) {
      const address = customer ? [customer.name, customer.address?.street, customer.address?.city, customer.phone?.join('/')].filter(i => i).join('\n') : '' ;
      return address
   }

   static setCustomer(fullAddress: string) {
      const [name = '', address = '', city = '', phoneno = ''] =
                  fullAddress?.split(/[\r\n]+/) || '';
      const cust = {
                  name,
                  address: {
                    street: address,
                    city,
                  },
                  phone: phoneno?.split('/'),
                };
                
      
      return cust
   }

}
