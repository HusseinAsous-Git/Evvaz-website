import { AdminMyTenderModel } from "./admin.mytender.model";

export class AdminTenderResolverModel {
    tender_data: AdminMyTenderModel;
    tender_id: number;
    tender_title: string;
    tender_display_date: number;
    response_count: number;
    tender_explain: string;
    category;
    tender_expire_date: number;
    categories : {
        id: number;
        category_name: string;
        count: number;
        school_name: string;
        school_logo_image: string;
    } [] ;
}