export interface BulkUpload {
    acceptedRecipients: AcceptedRecipient[];
    rejectedRecipients: RejectedRecipient[];
}

export interface AcceptedRecipient {
    serialNumber:             string;
    taxYear:                  number;
    businessId:               string;
    name:                     string;
    email:                    string;
    mobileNumber:             string;
    tinNumber:                string;
    employeeId:               string;
    payerStateNumber:         string;
    stateIncome:              null;
    secondTinNotification:    boolean;
    nonEmployeeCompensation:  number;
    federalIncomeTaxWithheld: null;
    addressRequest:           AddressRequest;
    stateTaxRequests:         StateTaxRequest[];
    fatcafilingNotification:  boolean;
}

export interface AddressRequest {
    addressLine1: string;
    addressLine2: string;
    zip:          string;
    city:         string;
    state:        string;
    country:      string;
}

export interface StateTaxRequest {
    state:            string;
    stateTaxWithheld: null;
    stateIncome:      null;
}

export interface RejectedRecipient {
    serialNumber:             string;
    taxYear:                  string;
    name:                     string;
    email:                    string;
    mobileNumber:             string;
    tinNumber:                string;
    employeeId:               string;
    payerStateNumber:         string;
    stateIncome:              string;
    secondTinNotification:    string;
    nonEmployeeCompensation:  string;
    federalIncomeTaxWithheld: string;
    addressLine1:             string;
    addressLine2:             string;
    zip:                      string;
    city:                     string;
    state:                    string;
    country:                  string;
    state1:                   string;
    stateIncome1:             string;
    stateWithHeld1:           string;
    state2:                   string;
    stateIncome2:             string;
    stateWithHeld2:           string;
    rejectionReasons?:        RejectionReasons;
    fatcafilingNotification:  string;
}

export interface RejectionReasons {
    serialNumber:             string;
    taxYear:                  string;
    name:                     string;
    email:                    string;
    mobileNumber:             string;
    tinNumber:                string;
    employeeId:               string;
    payerStateNumber:         string;
    stateIncome:              string;
    secondTinNotification:    string;
    nonEmployeeCompensation:  string;
    federalIncomeTaxWithheld: string;
    addressLine1:             string;
    addressLine2:             string;
    zip:                      string;
    city:                     string;
    state:                    string;
    country:                  string;
    state1:                   string;
    stateIncome1:             string;
    stateWithHeld1:           string;
    state2:                   string;
    stateIncome2:             string;
    stateWithHeld2:           string;
    rejectionReasons?:        RejectionReasons;
    fatcafilingNotification:  string;
    Error:                    string;
}