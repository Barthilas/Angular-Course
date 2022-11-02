import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { checkMargins } from 'ngx-bootstrap/positioning';
import { HeaderComponent } from '../header/header.component';
import { Helpers } from '../helpers/helpers';
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  hotelName: string = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = false;

  //static = available in ngOnInit
  //Can be used when headerComponent has no async in ngOnInit f.e
  //tldr: if component has some delays in creation or uses async use static: false (default)
  //If you are not sure just keep it default.
  //multiple instances? Access the first one. @ViewChilder for more instances
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Room List';

  selectedRoom!: RoomList;

  roomsList: RoomList[] = [];

  //DI - try to not access service from template -> private/protected
  constructor(private roomsService: RoomsService) {}

  //Rarely used
  //change detector has completed one change-check cycle
  ngAfterViewChecked(): void {

  }

  //DOM, Template ready for all children.
  ngAfterViewInit(): void {
    console.log(Helpers.prepareConsoleLogMsg("ngAfterViewInit called"))
    //error ng100. Developer mode ok, Production bad.
    //change detection is ran twice in dev mode..
    // this.headerComponent.title = "Rooms View";

    //Fix
    setTimeout(() => {
      this.headerComponent.title = "Rooms View"
    }, 0)

    this.headerChildrenComponent.last.title = "last title";
    // let a = this.headerChildrenComponent.get(0)
  }

  // Do not implement together with ngOnChanges.
  // Generally avoid.
  ngDoCheck(): void {
    console.log(Helpers.prepareConsoleLogMsg("ngDoCheck called"))
  }

  ngOnInit(): void {
    console.log(Helpers.prepareConsoleLogMsg("ngOnInit called"))
    this.roomsList = this.roomsService.getRooms();
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
}
