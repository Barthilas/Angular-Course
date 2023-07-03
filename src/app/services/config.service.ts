import { Inject, Injectable } from '@angular/core';
import { RouteConfigToken } from './routeConfig.service';
import { RouteConfig } from './routeConfig';

@Injectable({
  // any - create one instance for entire codebase and one for lazy loaded modules. Use-case pass other configuration (as provider) to different service.
  // root -> singleton
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig) {
    console.log("ConfigService initialized.");
    console.log(this.configToken);
  }
}
