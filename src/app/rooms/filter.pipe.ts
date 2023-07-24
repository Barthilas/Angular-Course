import { Pipe, PipeTransform } from '@angular/core';
import { RoomList } from './rooms';

@Pipe({
  name: 'filter'
})
// Example do filtering on backend.
export class FilterPipe implements PipeTransform {

  transform(rooms: RoomList[], price: number): RoomList[] {
    return rooms.filter((room) => room.price > price)
  }

}
