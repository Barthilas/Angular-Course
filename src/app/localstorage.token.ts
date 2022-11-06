import { InjectionToken } from "@angular/core";

//value provider
export const LocalStorageToken = new InjectionToken<any>('description', {
  providedIn: "root",
  factory: () => {
    return localStorage;
  }
})
