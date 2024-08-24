export interface RecipientInformation {
    accepted: boolean;
    id: string;
    serialNumber?: number;
    bulkUploadId?: string;
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
    rejectionReasons?: RejectionReasons;
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

export interface RejectionReasons {
    serialNumber: string;
    taxYear: string;
    name: string;
    email: string;
    mobileNumber: string;
    tinNumber: string;
    employeeId: string;
    payerStateNumber: string;
    stateIncome: string;
    secondTinNotification: string;
    nonEmployeeCompensation: string;
    federalIncomeTaxWithheld: string;
    addressLine1: string;
    addressLine2: string;
    zip: string;
    city: string;
    state: string;
    country: string;
    state1: string;
    stateIncome1: string;
    stateWithHeld1: string;
    state2: string;
    stateIncome2: string;
    stateWithHeld2: string;
    rejectionReasons?: RejectionReasons;
    fatcafilingNotification: string;
    Error: string;
}
