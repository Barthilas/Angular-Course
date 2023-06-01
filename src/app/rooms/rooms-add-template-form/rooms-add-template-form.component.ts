import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';

@Component({
  selector: 'app-rooms-add-template-form',
  templateUrl: './rooms-add-template-form.component.html',
  styleUrls: ['./rooms-add-template-form.component.scss'],
})
export class RoomsAddTemplateFormComponent implements OnInit {
  room: RoomList = {
    roomType: '',
    amenities: '',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    photos: '',
    price: 0,
    rating: 0,
  };

  successMessage = '';

  constructor(private roomService: RoomsService) {}

  ngOnInit(): void {}

  addRoom() {
    this.roomService.addRooms(this.room).subscribe((data) => {
      this.successMessage = 'Room added.';
    });
  }
}
