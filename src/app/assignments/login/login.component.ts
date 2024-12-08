import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AssignmentsComponent } from '../assignments.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AssignmentsComponent, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    if (this.authService.logIn(this.login, this.password)) {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid login or password');
    }
  }
}
