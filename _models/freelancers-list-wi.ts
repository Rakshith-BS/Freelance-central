export interface FreelancerListWI {
    id: string;
    businessId: string;
    addressRequest: Address;
    firstName: string;
    businessName: string;
    contractorRateDuration: string;
    email: string;
    mobileNumber: string;
    tinNumber: string;
    hourlyRate: number;
    lastName: string;
    role: string;
    checked?: boolean;
}

export class Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    state: string;
    zip: string;
}
