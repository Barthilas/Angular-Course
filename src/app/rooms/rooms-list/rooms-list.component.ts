import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Helpers } from 'src/app/helpers/helpers';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush //Change detection ran only when something changes in this component. Not everytime.
  //RULES for it to work.
  //1. Don't change data internally.
  //2. Passed Data from parent component.
  //3. Properties should be immutable.
})

export class RoomsListComponent implements OnInit, OnChanges, OnDestroy {

@Input() rooms: RoomList[] | null = [];

@Input() title: string = '';

@Input() price = 0;

@Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() { }

  //ngOnChanges can be applied on component with input property.
  //triggered by data update on input().
  ngOnChanges(changes: SimpleChanges): void {
    console.log(Helpers.prepareConsoleLogMsg("ngOnChanges ran"))
    console.log(changes)
    if(changes['title'])
      this.title = changes['title'].currentValue.toUpperCase();
  }

  //Trigger: whenever component gets removed from DOM.
  //free memory, unsubscribe from data.
  ngOnDestroy(): void {
    console.log(Helpers.prepareConsoleLogMsg("ngOnDestroy"))
  }

  ngOnInit(): void {

  }

  onRoomSelected(room: RoomList)
  {
    this.selectedRoom.emit(room);
  }

}
