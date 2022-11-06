import { AfterViewInit, Component, ElementRef, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { LoggerService } from './logger.service';
import { RoomsComponent } from './rooms/rooms.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<h1>Hello from inline template</h1>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //optional - might not exist.
  constructor(@Optional() private loggerService: LoggerService)
  {

  }
  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 11;
  // }
  ngOnInit(): void {
    //undefined pro ViewChild static = false.
    // const componentRef = this.vcr.createComponent(RoomsComponent);

    this.loggerService?.log("AppComponent.ngOnInit()")
    this.name.nativeElement.innerText = "Dynamic edited"
  }

  @ViewChild('name', {static: true}) name!: ElementRef
  title = 'hotelinventoryapp';
  // role = "admin";
}
