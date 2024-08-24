
// This class is used for url constants
export class Urls {

    static W9Filing = class {
        static create = '/filing/w9filing/create-w9-account'
        static createForm = '/filing/w9filing/create-w9-form'
        static updateW9Form = '/filing/w9filing/update-w9-form/#'
        static w9Pdf = '/filing/w9filing/summary-pdf/#'
        static userDigitalSignature = '/filing/w9filing/user-digital-signature'
        static updateRecipientBusiness = '/filing/w9filing//update-recipient-business'

        static getBusiness = '/business/#'

        static uploadEmailDoc = '/filing/contractor/upload/#'
        static deleteEmailDoc = '/filing/contractor/delete/#'
        static inviteFreelancer = '/filing/contractor/invite'
        static saveTemplate = '/filing/contractor/save-template'
        static updateFreelancer = '/filing/contractor/update/#'
    }

    static Contractor = class {
        static listTemplates = '/filing/contractor/list-templates'
        static documentRename = '/filing/contractor/document/rename'
        static uploadDocument = '/filing/contractor/document/save'
        static deleteDocument = '/filing/contractor/delete-template/#'
        static listContractors = '/filing/contractor/list-contractors'
        static deleteContractor = '/filing/contractor/#'
        static sendDocument = '/filing/contractor/send-douments'
    }


    static TimeSheet = class {
        static invoice = '/filing/timesheet/invoice/#'
        static decline = '/filing/timesheet/decline-invoice/#'
        static getAllTasks = '/filing/timesheet/list/#'
    }

}