import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LoggerService } from './logger.service';
import { RoomsComponent } from './rooms/rooms.component';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<h1>Hello from inline template</h1>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  //optional - might not exist.
  constructor(
    @Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log('Loaded before app init: ', initService.config);
  }
  // @ViewChild('user', {read: ViewContainerRef}) vcr!: ViewContainerRef
  // ngAfterViewInit(): void {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 11;
  // }
  ngOnInit(): void {
    //undefined pro ViewChild static = false.
    // const componentRef = this.vcr.createComponent(RoomsComponent);

    this.router.events.subscribe((event) => {
      console.log(event);
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log('Navigation Started');
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('Navigation Completed');
      });

    this.loggerService?.log('AppComponent.ngOnInit()');
    this.name.nativeElement.innerText = 'Dynamic edited';
    this.localStorage.setItem('name', 'value');
  }

  @ViewChild('name', { static: true }) name!: ElementRef;
  title = 'hotelinventoryapp';
  // role = "admin";
}
