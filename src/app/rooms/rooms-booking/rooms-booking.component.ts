import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  id: number = -1;

  id$ = this.router.paramMap.pipe(map((params) => params.get("roomid")))

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    //if you change url wont react.
    // this.id = this.router.snapshot.params['roomid'];

    //no subscription manually
    // this.id$ = this.router.params.pipe(
    //   map(params => params["roomid"])
      // map((params) => {
      //   return params['roomid'];
      // })
    // );

    // this.router.paramMap.subscribe((params) => {
    //   params.get("roomid")
    // })

    // this.router.params.subscribe((params) => {
    //   console.log(params);
    //   this.id = params['roomid'];
    // });
  }
}
