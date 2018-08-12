export class SchoolRequestModel {
    request_id: number;
    request_details_file:string;
    request_title: string;
    request_explaination:string;
    request_display_date: Date;
    request_expired_date: Date;
    request_deliver_date: Date;
    request_payment_date: Date;
    request_is_available: number;
    request_is_conformied: number;
    school_id: number;
    request_category_id: number;
    receive_palce_id: number;
    extended_payment: number;
}