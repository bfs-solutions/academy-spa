import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CollectionService } from '../core/collection.service';
import { SecurityRuleResource } from './hal/security-rule.resource';
import { SecurityRule } from './security-rule';

@Injectable({
  providedIn: 'root'
})
export class SecurityRulesService extends CollectionService<SecurityRuleResource, SecurityRule> {

  constructor(http: HttpClient) {
    super(http, 'securityRules', './fixtures/security-rules.json');
  }
}
