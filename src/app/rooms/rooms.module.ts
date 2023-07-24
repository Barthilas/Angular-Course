import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsRoutingModule } from './rooms-routing.module';
import { RoomsAddTemplateFormComponent } from './rooms-add-template-form/rooms-add-template-form.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsListComponent } from './rooms-list/rooms-list.component';
import { RoomsComponent } from './rooms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '../header/header.module';
import { RouteConfigToken } from '../services/routeConfig.service';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    RoomsComponent,
    RoomsListComponent,
    RoomsBookingComponent,
    RoomsAddTemplateFormComponent,
    FilterPipe,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RoomsRoutingModule,
    HeaderModule,
    FormsModule //template forms
  ],
  providers: [
    {
      provide: RouteConfigToken,
      useValue: {title: 'Room'}
    },
  ]
})
export class RoomsModule { }
