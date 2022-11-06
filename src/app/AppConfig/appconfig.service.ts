import { InjectionToken } from "@angular/core";
import { IAppConfig } from "./IAppConfig";
import { environment } from "src/environments/environment";

//value provider
export const APP_SERVICE_CONFIG = new InjectionToken<IAppConfig>('app.config',
/*{ shorthand without module.
  providedIn: "root",
  factory: () => {
    return APP_CONFIG
    }
}*/
)

export const APP_CONFIG: IAppConfig = {
  apiEndpoint: environment.apiEndpoint
}
