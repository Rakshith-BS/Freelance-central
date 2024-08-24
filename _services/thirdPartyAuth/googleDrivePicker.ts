import {Injectable} from '@angular/core';
import { environment } from '@environments/environment';

declare const gapi: any;
declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDrivePickerService {

  private clientId = environment.GOOGLE_PICKER_CLIENT_ID
  private apiKey = environment.GOOGLE_PICKER_API_KEY
  private appId = environment.GOOGLE_PICKER_APP_ID;
  private scope = ['https://www.googleapis.com/auth/drive.file'];

  private oauthAccessToken = null;
  private pickerApiLoaded = false;
  private pickerCallback = null;

  public open(callback): void {
    this.pickerCallback = callback;
    gapi.load('auth', {'callback': this.onAuthApiLoad.bind(this)});
    gapi.load('picker', {'callback': this.onPickerApiLoad.bind(this)});
    gapi.load('client', {'callback': this.onClientLoad.bind(this)});
  }

  private onAuthApiLoad(): void {
    gapi.auth.authorize({
      'client_id': this.clientId,
      'scope': this.scope, // ['https://www.googleapis.com/auth/drive.file'],
      'immediate': false,
    }, this.handleAuthResult.bind(this));
  }

  private onPickerApiLoad(): void {
    this.pickerApiLoaded = true;
    this.createPicker();
  }

  private handleAuthResult(authResult): void {
    // console.log('authResult: ', authResult)
    // console.log('authResult error ', authResult.error)
    if (authResult && !authResult.error) {
      this.oauthAccessToken = authResult.access_token;
      this.createPicker();
    }
  }

  private onClientLoad() {
    console.log('onClientLoad: ', gapi.client)
  }

  private createPicker(): void {
    console.log('pickerApiLoaded: ', this.pickerApiLoaded)
    console.log('oauthAccessToken: ', this.oauthAccessToken)

    if (this.pickerApiLoaded && this.oauthAccessToken) {
      var view = new google.picker.View(google.picker.ViewId.DOCS);
      view.setMimeTypes('application/pdf') //("image/png,image/jpeg,image/jpg");
      var picker = new google.picker.PickerBuilder()
        .enableFeature(google.picker.Feature.NAV_HIDDEN)
        .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
        .setAppId(this.appId)
        .setOAuthToken(this.oauthAccessToken)
        .addView(view)
        .addView(new google.picker.DocsUploadView())
        .setDeveloperKey(this.apiKey)
        .setCallback(this.pickerCallback)
        .build();
      picker.setVisible(true);
    }
  }

  onDownload(fileInfo: any, callback: Function) {
    console.log('gapi.client: donwload: ', gapi.client)
    // gapi.client.load('drive', 'v2', () => {
    //   const request = gapi.client.drive.files.get({
    //     'fileId': fileInfo.id,
    //     // 'alt': 'media'
    //   }).then((response) => {
    //     // callback(response)
    //     console.log('gapi.client.drive.files.get ', response)
    //     this.downloadFile(response.result, callback)
    //   })
    // });

    this.downloadFile(fileInfo.id, callback)

    // var googleSelectedFile: any = null;

  }

  private _download(fileInfo: any, callback: Function) {
    gapi.client.request({
      'path': '/drive/v2/files/' + fileInfo.id,
      'method': 'GET',
      callback: function (responsejs, responsetxt) {

          const downloadUrl = responsejs.downloadUrl;

          var gDoxBlob = null;
          var xhr = new XMLHttpRequest();
          xhr.open("GET", downloadUrl); //file.url

          var accessToken = gapi.auth.getToken().access_token;
          xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

          xhr.responseType = "blob";
          xhr.onload = function () {
              gDoxBlob = xhr.response;
              // const blob = new Blob([gDoxBlob], {type: 'application/pdf'});
              // saveAs(gDoxBlob, 'a.pdf')
              // const url = URL.createObjectURL(gDoxBlob);
              // console.log('obj url: ', url)

              // callback({ file: blob });
              // let file = new File([gDoxBlob], fileInfo.name ,{type:"application/pdf", lastModified:new Date().getTime()});
              // let container = new DataTransfer();
              // container.items.add(file);
              // callback({file: gDoxBlob})
          }
          xhr.send();
      }
    });
  }

  private downloadFile(docId, callback: Function) {
    var accessToken = gapi.auth.getToken().access_token;
    // console.log('accessToken: ', accessToken)

    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://www.googleapis.com/drive/v3/files/"+docId+'?alt=media', true);
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhr.responseType = "blob";
    xhr.onload = () => {
      // console.log('xhr file.thumbnailLink: ', file.thumbnailLink)
      // console.log('xhr.response::', xhr.response)
      let gDoxBlob = xhr.response
      const blob = new Blob([gDoxBlob], {type: 'application/pdf'});
      // saveAs(gDoxBlob, 'a.pdf')
      // const url = URL.createObjectURL(gDoxBlob);
      // console.log('obj url: ', url)

      callback({ file: blob });
    };
    xhr.onerror = () => {
      callback(null);
    };
    xhr.send();
  }

  // onDownload(docId: string, callback: Function) {
  //   console.log('gapi.client: donwload: ', gapi.client)
  //   gapi.client.load('drive', 'v2', () => {
  //     const request = gapi.client.drive.files.export({
  //       'fileId': docId,
  //       'mimeType': 'application/pdf'
  //     }).then((file) => callback(file))
  //   });
  // }
}