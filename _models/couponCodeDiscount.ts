export interface CouponCodeDiscount {
    createdAt:     Date;
    updatedAt:     Date;
    couponCode:    string;
    formType:      string;
    effectiveDate: Date;
    validTo:       Date;
    percent:       number;
    amount:        number;
}