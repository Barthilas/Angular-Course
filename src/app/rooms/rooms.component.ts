import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { checkMargins } from 'ngx-bootstrap/positioning';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { Helpers } from '../helpers/helpers';
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';
import { PhotosService } from './services/photos.service';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked
{
  hotelName: string = 'Hilton Hotel';
  numberOfRooms = 10;
  hideRooms = true;

  //static = available in ngOnInit
  //Can be used when headerComponent has no async in ngOnInit f.e
  //tldr: if component has some delays in creation or uses async use static: false (default)
  //If you are not sure just keep it default.
  //multiple instances? Access the first one. @ViewChilder for more instances
  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  });

  totalBytes = 0;

  subscription!: Subscription;

  error$ : Subject<string> = new Subject();

  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      console.log(err);
      // dont do this in component, ngOnChanges will be called. This whole call should probably be inside service. (Demo)
      this.error$.next(err.message)
      return of([]);
    })
  );

  priceFilter = new FormControl(0);

  roomsCount$ = this.roomsService.getRooms$.pipe((
    map((rooms) => rooms.length)
  ))

  title = 'Room List';

  selectedRoom!: RoomList;

  roomsList: RoomList[] = [];

  //DI - try to not access service from template -> private/protected
  //SkipSelf provide modifier - skip search for service in this component.
  constructor(
    @SkipSelf() private roomsService: RoomsService,
    private photosService: PhotosService,
    private configService: ConfigService
  ) {}

  //Rarely used
  //change detector has completed one change-check cycle
  ngAfterViewChecked(): void {}

  //DOM, Template ready for all children.
  ngAfterViewInit(): void {
    console.log(Helpers.prepareConsoleLogMsg('ngAfterViewInit called'));
    //error ng100. Developer mode ok, Production bad.
    //change detection is ran twice in dev mode..
    // this.headerComponent.title = "Rooms View";

    //Fix
    setTimeout(() => {
      this.headerComponent.title = 'Rooms View';
    }, 0);

    this.headerChildrenComponent.last.title = 'last title';
    // let a = this.headerChildrenComponent.get(0)
  }

  // Do not implement together with ngOnChanges.
  // Generally avoid.
  ngDoCheck(): void {
    console.log(Helpers.prepareConsoleLogMsg('ngDoCheck called'));
  }

  ngOnInit(): void {

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;

        case HttpEventType.ResponseHeader:
          console.log('Request success!');
          break;

        case HttpEventType.DownloadProgress:
          this.totalBytes += event.loaded;
          break;
        case HttpEventType.Response:
          console.log(event.body);
          break;
      }
    });
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
    });
    this.stream.subscribe((data) => {
      console.log(data);
    });
    console.log(Helpers.prepareConsoleLogMsg('ngOnInit called'));

    // this.subscription = this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomsList = rooms;
    // });
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  addRoom(e: any) {
    const room: RoomList = {
      roomNumber: '4',
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
    // this.roomsList = [...this.roomsList, room]

    this.roomsService.addRooms(room).subscribe((data) => {
      this.roomsList = data;
    });
  }

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '1',
      roomType: 'Dummy1',
      amenities: 'Something',
      price: 500,
      photos: 'www',
      checkinTime: new Date('1.1.1980'),
      checkoutTime: new Date('2.1.1980'),
      rating: 3.246,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomsList = data;
    });
  }

  deleteRoom() {
    this.roomsService.deleteRoom('3').subscribe((data) => {
      this.roomsList = data;
    });
  }
}
