export class AdminTenderModel{
    tender_logo: string;
    tender_title: string;
    tender_explain: string;
    tender_display_date: number;
    tender_expire_date: number;
    tender_company_display_date: number;
    tender_company_expired_date: number;
    cats : {category_name: string} [] ;
}