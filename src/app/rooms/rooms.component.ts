import { Component, DoCheck, OnInit } from '@angular/core';
import { checkMargins } from 'ngx-bootstrap/positioning';
import { Room, RoomList } from './rooms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, DoCheck {
  hotelName: string = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = false;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Room List';

  selectedRoom!: RoomList;

  roomsList: RoomList[] = [];

  constructor() {}
  ngDoCheck(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.initData();
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  }

  addRoom(e: any) {
    const room: RoomList = {
      roomNumber: 4,
      roomType: 'Dummy',
      amenities: 'Something',
      price: 500,
      photos: 'www',
      checkinTime: new Date('1.1.1980'),
      checkoutTime: new Date('2.1.1980'),
      rating: 3.246,
    };

    //binded in child. ChangeDetection strategy onPush -> object should not be mutable. Return new instance.
    // this.roomsList.push(room);
    this.roomsList = [...this.roomsList, room]
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  private initData() {
    this.roomsList = [
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
  }
}
