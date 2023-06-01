import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { IAppConfig } from 'src/app/AppConfig/IAppConfig';
import { environment } from 'src/environments/environment';
import { Room, RoomList } from '../rooms';
import { shareReplay } from 'rxjs';

/* providedIn
root - shorthand instead of registering in app module, single instance available across.
platform - used internally
any -
*/

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  //just use http-interceptor.
  header = new HttpHeaders({
    'token': "1234"
  });
  roomList: RoomList[] = [
    {
      roomNumber: '1',
      roomType: 'Deluxe Room',
      amenities: 'Everything, WIFI.',
      price: 500,
      photos: 'https://',
      checkinTime: new Date('1.1.1980'),
      checkoutTime: new Date('2.1.1980'),
      rating: 4.5,
    },
    {
      roomNumber: '2',
      roomType: 'Deluxe Room 2',
      amenities: 'No Wifi',
      price: 1000,
      photos: 'https://',
      checkinTime: new Date('1.1.1980'),
      checkoutTime: new Date('2.1.1980'),
      rating: 3.5434,
    },
  ];

  getRooms$ = this.http.get<RoomList[]>('/api/rooms', {headers: this.header}).pipe(
    shareReplay(1)
  );

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: IAppConfig,
    private http: HttpClient
  ) {
    console.log(config.apiEndpoint);
    console.log('Service initialized.');
  }

  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms', {

    });
  }

  //returns all data.
  addRooms(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  deleteRoom(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/photos',
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
  }
}
