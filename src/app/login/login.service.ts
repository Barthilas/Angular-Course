import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn = false;
  isAdmin = false;
  constructor() { }

  login(email: string, password: string)
  {
    if(email === "admin@gmail.com" && password === "a") {
      alert("Login Successful.")
      //
      // this.route.navigate(['/rooms', 'add']);
      //
      // this.route.navigateByUrl('/rooms/add');
      this.isLoggedIn = true;
      this.isAdmin = true;
    }
    if(email === "user@gmail.com" && password === "u") {
      alert("Login Successful.")
      this.isLoggedIn = true;
      this.isAdmin = false;
    }
    return this.isLoggedIn;

  }
}
