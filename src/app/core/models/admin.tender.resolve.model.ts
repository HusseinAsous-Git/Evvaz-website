import { AdminMyTenderModel } from "./admin.mytender.model";

export class AdminTenderResolverModel {
    tender_data: AdminMyTenderModel;
    categories : {
        id: number;
        category_name: string;
        count: number;
        school_name: string;
        school_logo_image: string;
    } [] ;
}