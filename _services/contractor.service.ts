import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoreApi } from "./core.service";
import { Urls } from "./urls";


@Injectable({
  providedIn: 'root'
})
export class ContractorService extends CoreApi {

  constructor(
    protected http: HttpClient
  ) {
    super(http)
  } 

  listTemplates(): Observable<any> {
    return this.get(Urls.Contractor.listTemplates)
  }

  documentRename(body: any): Observable<any> {
    return this.post(Urls.Contractor.documentRename, body)
  }

  uploadEmployerDocument(formData: FormData): Observable<any> {
    const header = {
        headers: new HttpHeaders()
          .set('Access-Control-Allow-Origin', '*')
          .set('Authorization', this.getToken()),
        reportProgress: true,
        observe: 'events'
    }
    return this.post(Urls.Contractor.uploadDocument, formData, null, header)
  }

  deleteDocument(templateID: string): Observable<any> {
    return this.delete(Urls.Contractor.deleteDocument.replace('#', templateID))
  }

  listContractor(): Observable<any> {
    return this.get(Urls.Contractor.listContractors)
  }

  deleteContractor(contractorID: string): Observable<any> {
    return this.delete(Urls.Contractor.deleteContractor.replace('#', contractorID))
  }

  inviteMultipleContractors(body: any): Observable<any> {
    return this.post(Urls.Contractor.sendDocument, body)
  }
  
}