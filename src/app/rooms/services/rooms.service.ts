import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appconfig.service';
import { IAppConfig } from 'src/app/AppConfig/IAppConfig';
import { environment } from 'src/environments/environment';
import { RoomList } from '../rooms';

/* providedIn
root - shorthand instead of registering in app module, single instance available across.
platform - used internally
any -
*/

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
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

  constructor(@Inject(APP_SERVICE_CONFIG) private config: IAppConfig, private http: HttpClient) {
    console.log(config.apiEndpoint)
    console.log("Service initialized.")
  }

  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRooms(room: RoomList)
  {
    return this.http.post<RoomList[]>('/api/rooms', room)
  }
}
