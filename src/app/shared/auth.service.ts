import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;
  currentUserRole: string | null = null;

  // Array of users with login, password, and role (user or admin)
  users = [
    { login: 'user1', password: 'password1', role: 'user' },
    { login: 'admin', password: 'admin', role: 'admin' }
  ];

  // Method to log in a user
  logIn(login: string, password: string) {
    const user = this.users.find(u => u.login === login && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUserRole = user.role;
      return true;
    }
    this.loggedIn = false;
    this.currentUserRole = null;
    return false;
  }

  logOut() {
    this.loggedIn = false;
    this.currentUserRole = null;
  }

  // Method to check if a user is logged in
  isLogged() {
    return this.loggedIn;
  }
}
