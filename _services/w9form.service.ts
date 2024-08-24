import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/_models';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { CoreApi } from './core.service';
import { Urls } from './urls';

@Injectable({
  providedIn: 'root'
})
export class W9FormService extends CoreApi {

  constructor(
    protected http: HttpClient
  ) {
    super(http)
  } 
  
  // getHeaders(token: boolean=true): HttpHeaders {
  //   return new HttpHeaders()
  //   .set('content-type', 'application/json;')
  //   .set('Access-Control-Allow-Origin', '*')
  //   .set('Authorization', token ? this.getToken() : '');
  // }

  // getApiBaseUrl(): any {
  //     return environment.apiUrl;
  // }

  // getToken(): string {
  //     const userObj =  (JSON.parse(localStorage.getItem('user'))) as User;
  //     if (userObj) {
  //         return 'Bearer '  + userObj.accessToken;
  //     }
  //     return '';
  // }

  // // call POST method in core
  // post(url: string, body?: any, token?: boolean, header: any=null): Observable<any> {
  //   let header_ = header
  //   if (header_ == null) {
  //     header_ = { 
  //       headers: header? header : this.getHeaders(token)
  //     }
  //   }
  //   return this.http.post(this.getApiBaseUrl() + url, body, header_);
  // }

  // // call POST method in core
  // postTextResponse(url: string, body?: any, token?: boolean, header: any=null): Observable<any> {
  //   console.log('body: ', body)
  //   return this.http.post(this.getApiBaseUrl() + url, body, { 
  //     headers: header? header : this.getHeaders(token),
  //     responseType: 'text'
  //   });
  // }

  // // call GET method in core
  // get(url: string, token: boolean=true, header: any=null): Observable<any> {
  //   let header_ = header
  //   if (header_ == null) {
  //     header_ = { 
  //       headers: header? header : this.getHeaders(token)
  //     }
  //   }
  //   return this.http.get(this.getApiBaseUrl() + url, header_);
  // }

  // delete(url: string): Observable<any> {
  //   return this.http.delete(this.getApiBaseUrl() + url, {headers: this.getHeaders()});
  // }


  //=================================================================================================
  createW9Filing(body:any): Observable<any> {
    return this.post(Urls.W9Filing.create, body)
  }

  createW9Form(body:any): Observable<any> {
    return this.post(Urls.W9Filing.createForm, body)
  }

  updateW9Form(w9RecipientId: string, body:any): Observable<any> {
    return this.post(Urls.W9Filing.updateW9Form.replace('#', w9RecipientId), body)
  }

  getW9Pdf(w9RecipientId: string): Observable<any> {
    return this.post(Urls.W9Filing.w9Pdf.replace('#', w9RecipientId))
  }

  usertDigitalSignature(body: any): Observable<any> {
    return this.post(Urls.W9Filing.userDigitalSignature, body)
  }

  updateRecipientBusiness(body: any): Observable<any> {
    return this.post(Urls.W9Filing.updateRecipientBusiness, body)
  }

  // ======= 1011 flow ===========
  getBusiness(id: any): Observable<any> {
    return this.get(Urls.W9Filing.getBusiness.replace('#', id))
  }
  
  uploadEmailDoc(contractorId: string, formData: FormData): Observable<any> {
    // const token_ = "AYADePw92v/ZfauGkCsgy1aIVSECLwACABVhd3MtY3J5cHRvLXB1YmxpYy1rZXkAREE0dTc1ZU9oOXdkY0lHYVpGNVBOU09mM0pVdjNINHNyUFVOdFRERzlIRU54TmxiZUFVUW5oajdaaG5DSS84d3UzQT09AOZleUpoYkdjaU9pSklVelV4TWlKOS5leUp6ZFdJaU9pSTVORE5qWVRrell5MHdOamhoTFRSa01ETXRZVEV4TWkwNU1EazRZbVpoTm1VeVl6TTZPbEpQVEVWZlZWTkZVaUlzSW1saGRDSTZNVFl5TVRJME16WTJOU3dpWlhod0lqb3hOakl4TnpZeU1EWTFmUS5YS3FhejlzMUMtemNIWk1FcWZYbW5URTBfc3JYY1l5NVl1YWE5aWZBSkZCeUZ3ZEtnbUhaSllLRXA4M3M4UGxNMU9hX19ZS1dSMGVLbU5DTDkyOE4wZwDmZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKemRXSWlPaUk1TkROallUa3pZeTB3TmpoaExUUmtNRE10WVRFeE1pMDVNRGs0WW1aaE5tVXlZek02T2xKUFRFVmZWVk5GVWlJc0ltbGhkQ0k2TVRZeU1USTBNelkyTlN3aVpYaHdJam94TmpJeE56WXlNRFkxZlEuWEtxYXo5czFDLXpjSFpNRXFmWG1uVEUwX3NyWGNZeTVZdWFhOWlmQUpGQnlGd2RLZ21IWkpZS0VwODNzOFBsTTFPYV9fWUtXUjBlS21OQ0w5MjhOMGcAAQAHYXdzLWttcwBMYXJuOmF3czprbXM6YXAtc291dGgtMTo3Mzc0NzI4MTg0OTI6a2V5LzA4YzdmZDEwLWZhNTMtNDc3Ny04MDY3LWQzZDI0YTcwMGNhZgC4AQIBAHjO3gs0w0N9k94U05teIOevCa8WXzXeZTxOUYcTq3DodgEir0N28dngjuL1PHQUvhBoAAAAfjB8BgkqhkiG9w0BBwagbzBtAgEAMGgGCSqGSIb3DQEHATAeBglghkgBZQMEAS4wEQQME1MkV9E2e0Ms5OP/AgEQgDvnJjIH25J6Bu9PGYAYPNdf62JcupMh58RcjiIM75IsxjPobsfBe7aheea8VJOfCnB4VElYvaegqoMmMwIAAAAADAAAEAAAAAAAAAAAAAAAAABdv18dzXqAwIOYWPNYuHHq/////wAAAAEAAAAAAAAAAAAAAAEAAADmXKyS52FGfbsIYe/kqQW93L3ow29rI32ThUBxkZIcSkeZy5yb4sOZz84VPgwgcltOQPXk8KDby4bHBUZc+yXYRBO8ffwOLdimPhQaJWcR7LQE5CppemWk+m6YjDhJYawkY3fnBMgukXStoLZH/mX0c0izMmGwUuEC5TOht0/GBO08XUSeT+A0yHpAFZSOGnZqW/rssaRh25BosQQeHW1niR3ssXN1rhNsw0q/5ixrNXuoSz/h2rwmuOc0BnrXLANmcc/+u5kxH+inlXHOEoJ0B2vTEbxkSMIivZIlu9/NGLVrhUYrcF3t9CEvtbWdk6qLem8J3VG6AGcwZQIxALEMm8dUzw1V6LhzD4v4GYsD/d6E0hSfYIGeooeBtePMEk7vlzfRUfeWQoxdY6foYgIwEoyyuFDwz4gzR9364rD6cne2IXIdDBgdcxCO7lz2THi998GZQri01dR7cN0rBO4n"
    const header = {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .set('Authorization', this.getToken()),
          // .set('Authorization', 'Bearer '  + token_ ),
        reportProgress: true,
        observe: 'events'
    }
    return this.post(Urls.W9Filing.uploadEmailDoc.replace('#', contractorId), formData, null, header)
  }

  deleteEmailDoc(fileId: string): Observable<any> {
    return this.delete(Urls.W9Filing.deleteEmailDoc.replace('#', fileId))
  }

  inviteFreelancer(body: any): Observable<any> {
    return this.post(Urls.W9Filing.inviteFreelancer, body)
  }

  saveTemplate(body: any): Observable<any> {
    return this.post(Urls.W9Filing.saveTemplate, body)
  }

  updateFreelancer(contractorId: string, body: any): Observable<any> {
    const ur = Urls.W9Filing.updateFreelancer.replace('#', contractorId)
    console.log('updateFreelancer url: ', ur)
    return this.post(Urls.W9Filing.updateFreelancer.replace('#', contractorId), body)
  }
  
}
