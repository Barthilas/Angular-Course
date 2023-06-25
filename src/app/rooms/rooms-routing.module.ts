import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsAddTemplateFormComponent } from './rooms-add-template-form/rooms-add-template-form.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { RoomsComponent } from './rooms.component';

// Check lazy loading inside Console -> Sources (should not be visible.) or network tab.

const routes: Routes = [
  {
    path: '', // because of lazy load.
    // path: 'rooms',
    component: RoomsComponent,
    children: [
      // beware of ordering here, otherwise it will match second route.
      { path: 'add', component: RoomsAddTemplateFormComponent },
      { path: ':roomid', component: RoomsBookingComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
