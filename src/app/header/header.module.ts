import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';



@NgModule({
  // component can be registered one time only.
  declarations: [HeaderComponent],
  imports: [
    CommonModule
  ],
  // makes component available to other modules.
  exports: [HeaderComponent]
})
export class HeaderModule { }
