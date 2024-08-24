export interface BundleBasedPrice {
    bundle_id: number;
    bundle_name:  string;
    filing_count: number;
    bundle_value: number;
    tax_rate:     number;
    tax_amount:   number;
    pricing_per_form: number;
    no_of_forms: number;
}