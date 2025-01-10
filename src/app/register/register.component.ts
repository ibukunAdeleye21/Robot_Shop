import { Component } from '@angular/core';
import { IUserRegisterCredentials } from '../user/user.model';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  registerCredentials: IUserRegisterCredentials = {firstName: '', lastName: '', email: '', phoneNumber: null, password: ''};
  registerError: boolean = false;
  successMessage: string | null = null;
  errorMessagge: string | null = null;

  constructor(private userService: UserService,
    private router: Router) { 
    this.userService.getRegisterUser().subscribe(user => {
      console.log('Current User: ', user);
    })
  }

  getType(variable: any): string {
    return typeof variable;
  }


  register() {
    this.registerError = false;
    this.userService.register(this.registerCredentials).subscribe({
      next: () => {
        this.successMessage = "Registration Successful";
        setTimeout(() => this.router.navigate(['/sign-in']), 2000);
      },
      error: () => (this.registerError = true) 
    });
  }
}
