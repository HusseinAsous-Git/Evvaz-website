export class AdminRequestTenderModel {
    tender_id: number;
    tender_title: string;
    tender_explain: string;
    tender_display_date: number;
    tender_expire_date: number;
    response_count: number;
    res: string;
    schools : {
        school_id: number;
        school_name: string;
        school_logo_image: string;
        categories : {
            id: number;
            category_name: string;
            count: number;
        } [] ;
    } [] ;
    
}