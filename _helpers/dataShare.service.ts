/*
    This service is used to pass data from once to other controller

    For help:
    http://coding-karma.com/2018/05/06/angular-5-sharing-data-components-using-rxjs-subject/
*/

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
 
export interface DataShareFormat {
    data: any 
    fromPage?: string
    toPage?: string
}
 
@Injectable({
    providedIn: 'root'
})
export class DataShareService {
 
    shared = new Subject<any>(); 
    sendDataToOtherComponent(tag: string, data: any) {
      this.shared.next({ tag: tag, data: data});
    }

    sharedWithMetaData = new Subject<any>();
    sendDataWithMetaToOtherComponent(tag: string, data: DataShareFormat) {
        this.sharedWithMetaData.next({ tag: tag, data: data});
    }
}

/*
    Example:

    ======== sender ============
    const dataToSend: DataShareFormat = {
      data: this.filesToUpload,
      fromPage: "FreelancerEmailComponent",
    }

    this.dataShareService.sendDataWithMetaToOtherComponent("tag",dataToSend)
    this.router.navigate(['/auth/employer/freelancer-email-filled'], {});  


    ========== receiver ===========
    constrstor() {
        this.dataShareService.sharedWithMetaData.subscribe(receiveddata => {
            console.log('receiveddata: ', receiveddata)
        })
    }
 
*/