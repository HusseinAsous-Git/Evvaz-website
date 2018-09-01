import { PipeTransform ,Pipe } from '@angular/core';
import {SchoolRequest} from '../../models/school-category-request.model';
@Pipe({ name: 'categoryFilter' })

export class categoryFilterPipe implements PipeTransform{
    transform(requests:SchoolRequest[],searchTitle:string):SchoolRequest[]{
        if (!requests || !searchTitle) {
            return requests;
        }

        return requests.filter(request =>
            request.request_title.toLowerCase().indexOf(searchTitle.toLowerCase()) !== -1);
    }
}