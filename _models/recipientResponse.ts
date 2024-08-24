export interface RecipientReponse {
    id: string;
    businessId: string;
    addressRequest: Address;
    stateTaxRequests: object[];
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

export class StateTax {
    state: string;
    stateTaxWithheld: number;
    stateTaxStateIncome: number;
}
