export class SchoolRequest{
    request_id: number;
    request_title: string;
    request_explaination: string;
    request_display_date: number;
    request_expired_date:number;
    request_is_available:number;
    request_is_conformied:number=0;
    school_id:number;
    school_name: string;
    school_logo_image: string;
    request_category_id: number;
    request_category_name: string;
    extended_payment:number=0;
    request_count: number=0;
    daysLeft:number;
    open:boolean;
}