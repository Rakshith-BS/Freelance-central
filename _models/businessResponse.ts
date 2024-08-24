export interface Business {
    id: string;
    business: BusinessResponse
}

interface BusinessResponse {
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

interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    state: string;
    street: string;
    zip: string
}