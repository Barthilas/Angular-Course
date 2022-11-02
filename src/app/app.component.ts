import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<h1>Hello from inline template</h1>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 11;
  // }
  ngOnInit(): void {
    //undefined, static = false.
    // const componentRef = this.vcr.createComponent(RoomsComponent);

    this.name.nativeElement.innerText = "Dynamic edited"
  }

  @ViewChild('name', {static: true}) name!: ElementRef
  title = 'hotelinventoryapp';
  // role = "admin";
}
