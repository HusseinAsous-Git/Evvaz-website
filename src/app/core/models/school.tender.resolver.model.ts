export class SchoolTenderResolverModel{
    data: {
        tender_id: number;
        tender_title: string;
        tender_explain: string;
        tender_display_date: number;
        tender_expire_date: number;
        response_count: number;
    };
    categories : {
        id: number;
        category_name: string;
    } [];
}