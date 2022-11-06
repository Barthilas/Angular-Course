import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
  // providers - add service to component. Creates new instance.
})
export class EmployeeComponent implements OnInit {

  empName: string = "John";

  constructor() { }

  ngOnInit(): void {
  }

}
