export class BusinessRequest {
    address: Address;
    businessName: string;
    employeeCountContract: number;
    employeeCountFullTime: number;
    mobileNumber: string;
    email: string;
    name: string;
    tinNumber: string;
    tinType: string
}

export class Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    state: string;
    street: string;
    zip: string
}