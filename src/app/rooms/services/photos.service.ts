import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  getPhotos()
  {
    const request = new HttpRequest('GET', "https://jsonplaceholder.typicode.com/photos", {
      reportProgress: true,
    });
    return this.http.request(request);
  }
}
