import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import {
  FormGroup,
  FormBuilder,
  Form,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { BookingService } from './service/booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/CustomValidator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;

  // error not initialized -> change to getter
  // guests = this.bookingForm.get('guests') as FormArray;
  get guests(): FormArray {
    return this.bookingForm.get('guests') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('roomid');

    this.bookingForm = this.fb.group({
      roomId: new FormControl(
        { value: roomId, disabled: true },
        { validators: [Validators.required] }
      ), // alternative way.
      guestEmail: [
        '',
        {
          updateOn: 'blur', // do not update on keystroke.
          validators: [Validators.required, Validators.email],
        },
      ],
      checkinDate: [''],
      checkoutDate: [''],
      bookingStatus: [''],
      bookingAmount: [''],
      bookingDate: [''],
      mobileNumber: [''],
      guestName: [null, [Validators.required, Validators.minLength(5)]],
      address: this.fb.group({
        addressLine: ['', { validators: [Validators.required] }],
        city: ['', { validators: [Validators.required] }],
        state: ['', { validators: [Validators.required] }],
        country: [''],
        zipCode: [''],
      }),
      guests: this.fb.array([this.addGuestInternal()]),
      tnc: [false, [Validators.requiredTrue]],
      // guestList: [''],
    });
    // called each keypress - default can be changed
    this.getBookingData();

    this.bookingForm.valueChanges.subscribe((data) => {
      console.log(data);
      // this.bookingService.bookRoom(data).subscribe((data) => {});
    });

    // this.bookingForm.valueChanges
    //   .pipe(
    //     // does not care about the sequence
    //     // mergeMap((data) => this.bookingService.bookRoom(data))

    //     // cancel any existing request if new data appear
    //     // switchMap((data) => this.bookingService.bookRoom(data))

    //     // cares about sequence, waits till subscription is finished.
    //     exhaustMap((data) => this.bookingService.bookRoom(data))
    //   )
    //   .subscribe();
  }

  // set vs patch
  getBookingData() {
    // has to define whole values for every control
    // this.bookingForm.setValue({
    //   guestEmail: 'fetchDataSimulation@neco.cz'
    // });
    this.bookingForm.patchValue({
      guestEmail: 'fetchDataSimulation@neco.cz',
    });
  }

  addBooking() {
    // this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data) => {
    //   console.log(data)
    // })

    // console.log(this.bookingForm.value); // disabled properties not available.
    console.log(this.bookingForm.getRawValue()); // all properties
    this.bookingForm.reset({}); // can be specified to which default values should be reseted.
  }

  addGuest() {
    this.guests.push(this.addGuestInternal());
  }

  private addGuestInternal(): FormGroup {
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl(''),
    });
  }

  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }

  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }

  removeGuest(index: number) {
    this.guests.removeAt(index);
  }
}
