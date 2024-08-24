export interface TierBasedPrice {
    filing_count:   number;
    price_per_form: number;
    service_fee:    number;
    tier_id:        number;
    tier_name:      string;
    tax_rate:       number;
    tax_amount:     number;
}