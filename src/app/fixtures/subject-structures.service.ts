import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CollectionService } from '../core/collection.service';
import { SubjectStructureResource } from './hal/subject-structure.resource';
import { SubjectStructure } from './subject-structure';

@Injectable({
  providedIn: 'root'
})
export class SubjectStructuresService extends CollectionService<SubjectStructureResource, SubjectStructure> {

  constructor(http: HttpClient) {
    super(http, 'subject-structures', '/fixtures/subject-structures.json');
  }
}
