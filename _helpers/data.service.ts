import { EventEmitter, Injectable, Output } from '@angular/core';
import { RouterStateSnapshot } from '@angular/router';
import { Business } from '@app/_models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {

    EDIT_BUSINESS = 'EDIT_BUSINESS';
    CREATE_BUSINESS = 'CREATE_BUSINESS';
    QB_BUSINESS = 'QB_BUSINESS';
    QB_RECIPIENTS = 'QB_RECIPIENTS';
    QB_IMPORTS = 'QB_IMPORTS';
    EDIT_RECIPIENT = 'EDIT_RECIPIENT';
    EDIT_RECIPIENT_W9 = 'EDIT_RECIPIENT_W9';
    RECIPIENT_LIST = 'RECIPIENT_LIST';
    BUSINESS_ID = 'BUSINESS_ID';
    TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS';
    BULK_UPLOAD = 'BULK_UPLOAD';
    ACCEPTED_RECIPIENTS = 'ACCEPTED_RECIPIENTS';
    REJECTED_RECIPIENTS = 'REJECTED_RECIPIENTS';
    RECIPIENT_INFORMATION = 'RECIPIENT_INFORMATION';
    ACKNOWLEDGE_RECIPIENTS = 'ACKNOWLEDGE_RECIPIENTS';
    W9_ACKNOWLEDGE_RECIPIENT = 'W9_ACKNOWLEDGE_RECIPIENT';
    W9_EMAIL_FILING_RECIPIENT_ID = 'W9_EMAIL_FILING_RECIPIENT_ID';
    W9_EMAIL_FILLED_DATA = 'W9_EMAIL_FILLED_DATA';
    W9_EMAIL_IS_SSN_SELECTED = 'W9_EMAIL_IS_SSN_SELECTED';
    W9_EMAIL_SIGNER_DETAILS = 'W9_EMAIL_SIGNER_DETAILS';
    W9_EMAIL_MARKETING_CHECKS = 'W9_EMAIL_MARKETING_CHECKS';
    W9_EMAIL_IS_FROM_DETAILS = 'W9_EMAIL_IS_FROM_DETAILS';
    W9_FORM_RESPONSE = 'W9_FORM_RESPONSE';
    W9_EMAIL_SUBMISSION_REFERENCE = 'W9_EMAIL_SUBMISSION_REFERENCE';
    W9_EMAIL_FILING_ID = 'W9_EMAIL_FILING_ID';
    IS_FROM_W9_EMAIL_REVIEW = 'IS_FROM_W9_EMAIL_REVIEW';
    W9_EMAIL_FORM_DETAILS = 'W9_EMAIL_FORM_DETAILS';
    SUBMISSION_PDF = 'SUBMISSION_PDF';
    SUBMISSION = 'SUBMISSION';
    A2HS = 'A2HS';
    EDIT_RECIPIENT_PAYMENT = 'EDIT_RECIPIENT_PAYMENT';
    SUBMISSION_NUMBER = 'SUBMISSION_NUMBER';
    GA_VIRTUAL_URL = 'GA_VIRTUAL_URL';
    IS_BUSINESS_CREATED = 'IS_BUSINESS_CREATED';
    userType = 'userType';
    w9BusinessId = 'w9BusinessId';
    SELECTED_RECIPIENT_W9 = 'SELECTED_RECIPIENT_W9';
    CONTRACTOR_MARKETING_CHECKS = 'CONTRACTOR_MARKETING_CHECKS';
    CONTRACTOR_ACKNOWLEDGE_INFO = 'CONTRACTOR_ACKNOWLEDGE_INFO';
    CONTRACTOR_ID = 'CONTRACTOR_ID';
    QUICKBOOKS_FROM_EMP = 'QUICKBOOKS_FROM_EMP';
    SELECTED_FREELANCER = 'SELECTED_FREELANCER';
    // ON_INVITE_CONTRACTOR_CLICK = 'ON_INVITE_CONTRACTOR_CLICK';

    @Output() showSucessMessage: EventEmitter<string> = new EventEmitter();

    @Output() getBusinessCount: EventEmitter<any> = new EventEmitter();

    setObject(obj: any, key: string): void {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    getObject(key: string): any {
        return localStorage.getItem(key);
    }

    getDictObject(key: string): any {
        try {
            return JSON.parse(this.getObject(key));
        } catch {
            return null
        }
    }

    clearObject(key: string): void {
        localStorage.setItem(key, '');
    }

    removeObject(key: string): void {
        // console.info('dataService removing value for key: ', key)
        localStorage.removeItem(key);
    }

    clearBusinessObjects(): void {
        this.clearObject(this.QB_BUSINESS);
        this.clearObject(this.EDIT_BUSINESS);
        this.clearObject(this.CREATE_BUSINESS);
    }

    setBusinessListCount(count, isLoading = false): void {
        localStorage.setItem('BUSINESS_LIST_COUNT', JSON.stringify({ businessCount: count, loading: isLoading }));
        this.getBusinessCount.emit(count);
    }

    getBusinessListCount(): any {
        let businessListObj: any = localStorage.getItem('BUSINESS_LIST_COUNT');
        businessListObj = businessListObj ? JSON.parse(businessListObj) : 0;
        return businessListObj.businessCount;
    }

    getBusinessListCountObj(): any {
        let businessListObj: any = localStorage.getItem('BUSINESS_LIST_COUNT');
        businessListObj = businessListObj ? JSON.parse(businessListObj) : { businessCount: 0, loading: false };
        return businessListObj;
    }

    getStatesList(): any {
        const states = [
            { value: 'AK', text: 'Alaska' },
            { value: 'AL', text: 'Alabama' },
            // {value: 'AP', text: 'Armed Forces Pacific'},
            { value: 'AR', text: 'Arkansas' },
            // {value: 'AS', text: 'American Samoa'},
            { value: 'AZ', text: 'Arizona' },
            { value: 'CA', text: 'California' },
            { value: 'CO', text: 'Colorado' },
            { value: 'CT', text: 'Connecticut' },
            { value: 'DC', text: 'District of Columbia' },
            { value: 'DE', text: 'Delaware' },
            { value: 'FL', text: 'Florida' },
            // {value: 'FM', text: 'Federated States of Micronesia'},
            { value: 'GA', text: 'Georgia' },
            // {value: 'GU', text: 'Guam'},
            { value: 'HI', text: 'Hawaii' },
            { value: 'IA', text: 'Iowa' },
            { value: 'ID', text: 'Idaho' },
            { value: 'IL', text: 'Illinois' },
            { value: 'IN', text: 'Indiana' },
            { value: 'KS', text: 'Kansas' },
            { value: 'KY', text: 'Kentucky' },
            { value: 'LA', text: 'Louisiana' },
            { value: 'MA', text: 'Massachusetts' },
            { value: 'MD', text: 'Maryland' },
            { value: 'ME', text: 'Maine' },
            // {value: 'MH', text: 'Marshall Islands'},
            { value: 'MI', text: 'Michigan' },
            { value: 'MN', text: 'Minnesota' },
            { value: 'MO', text: 'Missouri' },
            // {value: 'MP', text: 'Northern Mariana Islands'},
            { value: 'MS', text: 'Mississippi' },
            { value: 'MT', text: 'Montana' },
            { value: 'NC', text: 'North Carolina' },
            { value: 'ND', text: 'North Dakota' },
            { value: 'NE', text: 'Nebraska' },
            { value: 'NH', text: 'New Hampshire' },
            { value: 'NJ', text: 'New Jersey' },
            { value: 'NM', text: 'New Mexico' },
            { value: 'NV', text: 'Nevada' },
            { value: 'NY', text: 'New York' },
            { value: 'OH', text: 'Ohio' },
            { value: 'OK', text: 'Oklahoma' },
            { value: 'OR', text: 'Oregon' },
            { value: 'PA', text: 'Pennsylvania' },
            // {value: 'PR', text: 'Puerto Rico'},
            // {value: 'PW', text: 'Palau'},
            { value: 'RI', text: 'Rhode Island' },
            { value: 'SC', text: 'South Carolina' },
            { value: 'SD', text: 'South Dakota' },
            { value: 'TN', text: 'Tennessee' },
            { value: 'TX', text: 'Texas' },
            { value: 'UT', text: 'Utah' },
            { value: 'VA', text: 'Virginia' },
            // {value: 'VI', text: 'U.S. Virgin Islands'},
            { value: 'VT', text: 'Vermont' },
            { value: 'WA', text: 'Washington' },
            { value: 'WI', text: 'Wisconsin' },
            { value: 'WV', text: 'West Virginia' },
            { value: 'WY', text: 'Wyoming' }
        ];
        return states;
    }
}
