export interface Transaction {
    status_code: string;
    status: string;
    description: string;
    invoice_number: string;
    reason_code: string;
    reason_text: string;
    authorization_code: string;
    first_four_digit: string;
    transaction_id: string;
    response_code: string;
    payment_id: string;
    submission_number: any;
}
