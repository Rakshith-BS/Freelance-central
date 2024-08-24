export class RecipientFilingRequest {
    businessId: string;
    addressRequest: Address;
    stateTaxRequests: Object[];
    taxYear: number;
    name: string;
    email: string;
    mobileNumber: string;
    tinNumber: string;
    employeeId: string;
    payerStateNumber: string;
    stateIncome: number;
    secondTinNotification: boolean;
    fatcaFilingNotification: boolean;
    nonEmployeeCompensation: number;
    federalIncomeTaxWithheld: number;
}

export class Recipient {
    businessId: string;
    addressRequest: Address;
    stateTaxRequests: Object[];
    taxYear: number;
    name: string;
    email: string;
    mobileNumber: string;
    tinNumber: string;
    employeeId: string;
    payerStateNumber: string;
    stateIncome: number;
    secondTinNotification: boolean;
    fatcaFilingNotification: boolean;
    nonEmployeeCompensation: number;
    federalIncomeTaxWithheld: number;
}

export class Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    state: string;
    zip: string
}

export class StateTax {
    state: string;
    stateTaxWithheld: number;
    stateTaxStateIncome: number
}