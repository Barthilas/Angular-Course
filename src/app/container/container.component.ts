import {
  AfterContentInit,
  Component,
  ContentChild,
  Host,
  OnInit,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { Helpers } from '../helpers/helpers';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [RoomsService]
})
export class ContainerComponent implements OnInit, AfterContentInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  //All components under container will use this new instance. No child component and itself will go above in resolution tree to check where RoomsService is registered.
  constructor(@Host() private roomsService: RoomsService) {}

  ngAfterContentInit(): void {
    console.log(Helpers.prepareConsoleLogMsg('ngAfterContentInit'));
    console.log(this.employee);
    this.employee.empName = "ngAfterContentInit update";
  }
  //ngAfterContentChecked rarely used.

  ngOnInit(): void {}
}
