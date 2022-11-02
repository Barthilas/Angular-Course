import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { Helpers } from '../helpers/helpers';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, AfterContentInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  constructor() {}

  ngAfterContentInit(): void {
    console.log(Helpers.prepareConsoleLogMsg('ngAfterContentInit'));
    console.log(this.employee);
    this.employee.empName = "ngAfterContentInit update";
  }
  //ngAfterContentChecked rarely used.

  ngOnInit(): void {}
}
