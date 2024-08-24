// tslint:disable: max-line-length
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, RegisterRequest, RegisterResponse, BusinessRequest, RecipientFilingRequest, CouponCodeDiscount,
    TierBasedPrice, BundleBasedPrice, UserCredits, Transaction, RecipientInfoRequest
} from '@app/_models';
import { BulkUpload } from '@app/_models/bulkUpload';
import { RecipientInformation } from '@app/_models/recipientInformation';

@Injectable({ providedIn: 'root' })
export class ApiService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    @Output() getLoggedIn: EventEmitter<boolean> = new EventEmitter();


    constructor(
        private router: Router,
        private http: HttpClient
    )  {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    getHeaders(): HttpHeaders {
        return new HttpHeaders()
        // .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', this.getToken());
        // .set('Cache-Control', 'no-cache')
        // .set('Pragma', 'no-cache')
        // .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
        // .set('If-Modified-Since', '0');
    }

    getApiBaseUrl(): any {
        return environment.apiUrl;
    }

    getToken(): string {
        const userObj =  (JSON.parse(localStorage.getItem('user'))) as User;
        if (userObj) {
            return 'Bearer '  + userObj.accessToken;
        }
        return '';
    }

    login(email, password): any {
        return this.http.post<User>(`${environment.apiUrl}/auth/login`, { email, password }, {headers: this.getHeaders()})
            .pipe(map(res => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                const user = {
                    ...res,
                    email
                };
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                this.getLoggedIn.emit(true);
                return user;
            }));
    }

    facebookLogin(access_token): any {
        return this.http.post<User>(`${environment.apiUrl}/auth/facebook`, { access_token }, {headers: this.getHeaders()})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log('Login Response ->' + JSON.stringify(user));
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                this.getLoggedIn.emit(true);
                return user;
            }));
    }

    appleLogin(user): any {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.getLoggedIn.emit(true);
    }

    googleLogin(access_token): any {
        return this.http.post<User>(`${environment.apiUrl}/auth/google`, { access_token }, {headers: this.getHeaders()})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log('Login Response ->' + JSON.stringify(user));
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                this.getLoggedIn.emit(true);
                return user;
            }));
    }

    logout(): any  {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.getLoggedIn.emit(false);
        this.router.navigate(['/app/login']);
    }

    register(registerReq: RegisterRequest): any {
        return this.http.post<User>(`${environment.apiUrl}/auth/register`, registerReq, {headers: this.getHeaders()})
            .pipe(map(res => {
                const user = {
                    ...res,
                    email: registerReq.email,
                    name: registerReq.username
                };

                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                this.getLoggedIn.emit(true);
                return user;
            }));
    }

    contractorRegistration(registerReq: RegisterRequest): any {
        return this.http.post<User>(`${environment.apiUrl}/auth/register`, registerReq, {headers: this.getHeaders()})
            .pipe(map(res => {
                const user = {
                    ...res,
                    email: registerReq.email,
                    name: registerReq.username
                };

                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                this.getLoggedIn.emit(true);
                return user;
            }));
    }

    resetPassword(email: string): any {
        return this.http.post(`${environment.apiUrl}/auth/password/resetlink`, { email }, {headers: this.getHeaders()});
    }

    changePassword(password: string, confirmPassword: string, token: string): any {
        return this.http.post(`${environment.apiUrl}/auth/password/reset`, { password, confirmPassword, token }, {headers: this.getHeaders()});
    }

    emailVerification(token: string): any {
        return this.http.post(`${environment.apiUrl}/auth/registration/email-verify`, { token }, {headers: this.getHeaders()});
    }

    getUserBusinessList(): any {
        return this.http.get(`${environment.apiUrl}/business/business-list`, {headers: this.getHeaders()});
    }

    // addBusiness(business: BusinessRequest): any {
    //     return this.http.post(`${environment.apiUrl}/business/save`, {business}, {headers: this.getHeaders()});
    // }

    // updateBusiness(business: BusinessRequest, id: string): any  {
    //     return this.http.post(`${environment.apiUrl}/business/update/${id}`, {business}, {headers: this.getHeaders()});
    // }

    // deleteBusiness(id: string): any  {
    //     return this.http.delete(`${environment.apiUrl}/business/delete/${id}`, {headers: this.getHeaders()});
    // }

    getBusinessList(): any {
        return this.http.get(`${environment.apiUrl}/business/list`, {headers: this.getHeaders()});
    }

    // addRecipient(recipientFiling: RecipientFilingRequest): any  {
    //     return this.http.post(`${environment.apiUrl}/filing/save`, recipientFiling, {headers: this.getHeaders()});
    // }

    // updateRecipient(recipientFiling: RecipientFilingRequest, id: string): any  {
    //     return this.http.post(`${environment.apiUrl}/filing/update/${id}`, recipientFiling, {headers: this.getHeaders()});
    // }

    getRecipientList(id: string): any {
        return this.http.get(`${environment.apiUrl}/filing/list/${id}`, {headers: this.getHeaders()});
    }

    deleteRecipient(id: string): any {
        return this.http.delete(`${environment.apiUrl}/filing/${id}`, {headers: this.getHeaders()});
    }

    createFilingSubmission(payload): any  {
        return this.http.post(`${environment.apiUrl}/filing/submission/create`, payload, {headers: this.getHeaders()});
    }

    // getTierBasedPrice(recipientCount: String, stateFilingCount, street: string, city: string, state: string, zipcode: string, country: string): any  {
    //     return this.http.post<TierBasedPrice>(`${environment.apiUrl}/payment/get-servicefee/${recipientCount}/${stateFilingCount}`, {street, city, state, zipcode, country}, {headers: this.getHeaders()});
    // }

    // postBundleBasedPrice(filingCount: string, street: string, city: string, state: string, zipcode: string, country: string): any  {
    //     return this.http.post<BundleBasedPrice>(`${environment.apiUrl}/payment/filings/bundle/${filingCount}`, {street, city, state, zipcode, country}, {headers: this.getHeaders()});
    // }

    // getFilingCount(): any  {
    //     return this.http.get<number>(`${environment.apiUrl}/payment/filings/count`, {headers: this.getHeaders()});
    // }

    // addFilingCount(filingCount: number): any  {
    //     return this.http.post(`${environment.apiUrl}/payment/filings/add/${filingCount}`, {headers: this.getHeaders()});
    // }

    // removeFilingCount(filingCount: number): any  {
    //     return this.http.post(`${environment.apiUrl}/payment/filings/remove/${filingCount}`, {headers: this.getHeaders()});
    // }

    // getCredits(): any  {
    //     return this.http.get<UserCredits>(`${environment.apiUrl}/payment/get-credits/EFORM_1099`, {headers: this.getHeaders()});
    // }

    // getCouponCode(couponCode: string): any {
    //     return this.http.get<CouponCodeDiscount>(`${environment.apiUrl}/payment/get-discount/${couponCode}`, {headers: this.getHeaders()});
    // }

    // transactionWithBrainTree(payload): any {
    //     return this.http.post<Transaction>(`${environment.apiUrl}/payment/transaction`, payload, {headers: this.getHeaders()});
    // }

    // cardlessTransaction(model): any  {
    //     return this.http.post<Transaction>(`${environment.apiUrl}/payment/transactionwithoutcard`, model, {headers: this.getHeaders()});
    // }

    deletePaymentMethod(tokenId: string): any {
        return this.http.delete(`${environment.apiUrl}/payment/transaction/${tokenId}`,  {headers: this.getHeaders()});
    }

    // getTotalFilingCountAndNECAmount(recipientIds: any): any  {
    //     return this.http.post(`${environment.apiUrl}/filing/get-filing-amount`, recipientIds, {headers: this.getHeaders()});
    // }

    uploadCSVFile(formData, businessId: string, uploadSrc: string): any {

        let url = `${environment.apiUrl}/filing/bulk-upload/${businessId}`;
        if (uploadSrc === 'QB') {
            url = `${environment.apiUrl}/filing/qb-file-upload/${businessId}`;
        } else if (uploadSrc === 'ZOHO') {
            url = `${environment.apiUrl}/filing/zoho-file-upload/${businessId}`;
        } else if (uploadSrc === 'BILL') {
            url = `${environment.apiUrl}/filing/bill-file-upload/${businessId}`;
        }
        return this.http.post<RecipientInformation>(url, formData, {headers: this.getHeaders()});
    }

    bulkAddUpdateRecipient(recipient, recId): any {
        return this.http.post(`${environment.apiUrl}/filing/${recId ? 'update-recipient' : 'add-recipient'}${recId ? `/${recipient.id}` : ''}`, recipient, {headers: this.getHeaders()});
    }

    getAll(): any  {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string): any  {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params): any  {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id === this.userValue.accessToken)  {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string): any  {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id === this.userValue.accessToken)  {
                    this.logout();
                }
                return x;
            }));
    }

    paymentSuccessful(body): any {
        return this.http.post(`${environment.apiUrl}/filing/submission/bulk-create`, body, {headers: this.getHeaders()});
    }

    // removeUserCredits(body): any {
    //     return this.http.post(`${environment.apiUrl}/payment/remove-credits`, body, {headers: this.getHeaders()});
    // }

    // getRecipientStateQA(state: any): any  {
    //     return this.http.get(`${environment.apiUrl}/state-filing/get-recipient-state-qa?states=${state}`, {headers: this.getHeaders()});
    // }

    // getRecipientStateQAAnswers(businessId: any): any  {
    //     return this.http.get(`${environment.apiUrl}/state-filing/get-business-recipient-state-qa/${businessId}`, {headers: this.getHeaders()});
    // }

    // deleteRecipientStateQA(id: any): any  {
    //     return this.http.delete(`${environment.apiUrl}/state-filing/remove-business-recipient-state-qa/${id}`, {headers: this.getHeaders()});
    // }

    // saveRecipientStateQA(businessId, statesQA: any): any  {
    //     return this.http.post(`${environment.apiUrl}/state-filing/save-business-recipient-state-qa/bulk/${businessId}`, statesQA, {headers: this.getHeaders()});
    // }

    getRecipientAcknowlegement(id): any {
        return this.http.get(`${environment.apiUrl}/filing/submission/acknowledgement/${id}`, {headers: this.getHeaders()});
    }

    noThisIsNotMe(id): any {
        return this.http.post(`${environment.apiUrl}/filing/submission/noThisIsNotMe/${id}`, {}, {headers: this.getHeaders()});
    }

    getW9AcknowledgeInfo(id): any {
        return this.http.get(`${environment.apiUrl}/filing/w9/acknowledge-info/${id}`, {headers: this.getHeaders()});
    }
    w9NoThisIsNotMe(id): any {
        return this.http.post(`${environment.apiUrl}/filing/w9/no-this-is-not-me/${id}`, {headers: this.getHeaders()});
    }

    updateClickStatus(id: string): any {
        return this.http.post(`${environment.apiUrl}/filing/w9filing/update-click-status/${id}`, {}, {headers: this.getHeaders()});
    }

    updateEmpAckStatus(id: string): any {
        return this.http.post(`${environment.apiUrl}/filing/w9filing/update-emp-ack-status/${id}`, {}, {headers: this.getHeaders()});
    }

    getRecipientPdf(payload): any {
        return this.http.post(`${environment.apiUrl}/filing/submission/verify-recipient-pdf`, payload, {headers: this.getHeaders()});
    }
    geoLocationZip(zipcode): any {
        return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyAOHpnYuQhrulWGanQYHmM_5jrUuh_Xlp0&components=country:us|&type=json`);
    }

    // inviteEmail(model): any {
    //     return this.http.post(`${environment.apiUrl}/business/invite-friends`, model, {headers: this.getHeaders()});
    // }
    contactUsDetails(model): any {
        return this.http.post(`${environment.apiUrl}/auth/contactus/save`, model, {headers: this.getHeaders()});
    }

    getProfile(): any  {
        return this.http.get(`${environment.apiUrl}/auth/myprofile-info`, {headers: this.getHeaders()});
    }

    saveProfile(payload, field): any  {
        return this.http.post(`${environment.apiUrl}/auth/myprofile/change-${field}`, payload, {headers: this.getHeaders()});
    }

    verifyEmail(token): any  {
        return this.http.get(`${environment.apiUrl}/auth/myprofile/email-change-confirmation?token=${token}`, {headers: this.getHeaders()});
    }


    sendOtp(phoneNumber): any  {
        return this.http.post(`${environment.apiUrl}/auth/myprofile/change-phone/${phoneNumber}`, {}, {headers: this.getHeaders()});
    }

    verifyOtp(otp): any  {
        return this.http.post(`${environment.apiUrl}/auth/myprofile/verify-otp/${otp}`, {}, {headers: this.getHeaders()});
    }

    changeProfilePassword(payload): any  {
        return this.http.post(`${environment.apiUrl}/auth/myprofile/change-password`, payload, {headers: this.getHeaders()});
    }

    saveCCPA(payload): any  {
        return this.http.post(`${environment.apiUrl}/ccpa/datacontrol`, payload, {headers: this.getHeaders()});
    }

    addMultipleRecipients(recipients): any {
        return this.http.post(`${environment.apiUrl}/filing/add-multiple-recipient`, recipients, {headers: this.getHeaders()});
    }

    getQBBusinessVendors(payload): any {
        const headers = new HttpHeaders()
            .set('content-type', 'application/json;')
            .set('access-control-allow-origin', '*');
        return this.http.post(`${environment.apiUrl}/quickbooks/quickBooksInfo`, payload, {headers});
    }

    //No need to call different apis from front end as from backend only handling the condition
    // loginWithEform2290(body): any {
    //     return this.http.post(`https://www.eform2290.com/net/eformauthapi/api/v1/eformauth`, body, {headers: this.getHeaders()});
    // }

    sendUserExitDetails(pageInfo): any {
        return this.http.post(`${environment.apiUrl}/filing/customer-funnel?current-page=${pageInfo}`, {}, {headers: this.getHeaders()});
    }

    getQBDesktopBusiness(payload): any {
        return this.http.post(`https://integrationstart.freelancecentral.com/FCIntegrations/api/v1/fetch/business`, payload, {});
    }

    getQBDesktopVendors(payload): any {
        return this.http.post(`https://integrationstart.freelancecentral.com/FCIntegrations/api/v1/fetch/vendor`, payload, {});
    }

    updateW9Form(payload, recipientId): any {
        return this.http.post(`${environment.apiUrl}/filing/w9filing/update-w9-form/${recipientId}`, payload, {headers: this.getHeaders()})
    }
    updateUserType(userType): any {
        return this.http.post(`${environment.apiUrl}/auth/updateUserType/${userType}`, {}, { headers: this.getHeaders()});
    }

    addRecipientInfo(recipient: RecipientInfoRequest): any  {
        return this.http.post(`${environment.apiUrl}/filing/w9/add-recipient`, recipient, {headers: this.getHeaders()});
    }

    getRecipientInfoList(businessId): any {
        return this.http.get(`${environment.apiUrl}/filing/w9/${businessId}`, {headers: this.getHeaders()});
    }

    updateRecipientInfo(recipient: RecipientInfoRequest, id): any  {
        return this.http.post(`${environment.apiUrl}/filing/w9/update/${id}`, recipient, {headers: this.getHeaders()});
    }

    deleteRecipientInfo(id: string): any {
        return this.http.delete(`${environment.apiUrl}/filing/w9/${id}`, {headers: this.getHeaders()});
    }

    getFormList():any {
        return this.http.get(`${environment.apiUrl}/filing/w9/form-list`, {headers: this.getHeaders()});
    }

    uploadCSVFileW9(formData, businessId: string): any {
        let url = `${environment.apiUrl}/filing/w9/bulk-upload/${businessId}`;
        return this.http.post<RecipientInfoRequest>(url, formData, {headers: this.getHeaders()});
    }

    getFormType(formtype): any {
        return this.http.get(`${environment.apiUrl}/filing/w9/form-type-list?form-name=${formtype}`, {headers: this.getHeaders()});
    }
    userSignatureDetails(payload) {
        return this.http.post(`${environment.apiUrl}/filing/w9filing/user-digital-signature`, payload, {headers: this.getHeaders()})
    }

    createSubmission(recipientId) {
        return this.http.post(`${environment.apiUrl}/filing/w9filing/create-submission/${recipientId}`, {}, {headers: this.getHeaders()});
    }
}
