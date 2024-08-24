export interface UserCredits {
    createdAt:       Date;
    updatedAt:       Date;
    userId:          string;
    userEmail:       string;
    formType:        string;
    amount:          number;
    freeFilingCount: number;
}