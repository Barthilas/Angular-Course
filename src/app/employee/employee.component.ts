import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  // providers - add service to component. Creates new instance for this component.
  // providers: [RoomsService]
})
export class EmployeeComponent implements OnInit {

  empName: string = "John";

  //Self - should be available at this level, should be registered here -> else throw error.
  constructor(/*@Self()*/ private roomsService: RoomsService) { }

  ngOnInit(): void {
  }

}
