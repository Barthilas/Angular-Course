import { Injectable } from '@angular/core';
import { RoomList } from '../rooms';

/* providedIn
root -
platform - used internally
any -
*/

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomList: RoomList[] = [
    {
      roomNumber: 1,
      roomType: 'Deluxe Room',
      amenities: 'Everything, WIFI.',
      price: 500,
      photos: 'https://',
      checkinTime: new Date('1.1.1980'),
      checkoutTime: new Date('2.1.1980'),
      rating: 4.5,
    },
    {
      roomNumber: 2,
      roomType: 'Deluxe Room 2',
      amenities: 'No Wifi',
      price: 1000,
      photos: 'https://',
      checkinTime: new Date('1.1.1980'),
      checkoutTime: new Date('2.1.1980'),
      rating: 3.5434,
    },
  ];

  constructor() {}

  getRooms() {
    return this.roomList;
  }
}
